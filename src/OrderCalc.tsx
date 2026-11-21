import { startTransition, useActionState, useOptimistic, useRef, useState, useTransition } from 'react';
import styles from './OrderCalc.module.scss';
import { postOrder } from './requests';
import OrderCalculator, { type CalcOP } from './OrderCalculator';

export default function OrderCalc() {
  return (
    <div className={styles['order-calc-wrapper']}>
      <h1>Order Calc</h1>
      <div className={styles['two-order-calc']}>
        <OrderCalcTransition />
        <OrderCalcActionState />
        <OrderCalcCheckout />
      </div>
    </div>
  );
}

function OrderCalcTransition() {
  const [amount, setAmount] = useState(0);
  const [sum, setSum] = useState(0);
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <OrderCalculator
        title="Transition"
        amount={amount}
        sum={sum}
        isPending={isPending}
        onUpdate={type => {
          const newAmount = type === 'incr' ? amount + 1 : amount - 1;
          setAmount(newAmount);
          startTransition(async () => {
            const sum = await postOrder(newAmount);
            startTransition(() => setSum(sum));
          });
        }}
      />
    </>
  );
}

function OrderCalcActionState() {
  const [amount, setAmount] = useState(0);
  const [sum, dispathSum, isPending] = useActionState(sumReducer, 0);
  const abort = useRef<AbortController>(null);

  return (
    <OrderCalculator
      title="ActionState"
      amount={amount}
      sum={sum}
      isPending={isPending}
      onUpdate={type => {
        const newAmount = type === 'incr' ? amount + 1 : amount - 1;
        setAmount(newAmount);

        if (abort.current != null) {
          abort.current.abort('too late');
        }
        abort.current = new AbortController();

        startTransition(() => {
          dispathSum({ type, signal: abort.current?.signal });
          // dispathSum({ type });
        });
      }}
    />
  );

  async function sumReducer(prev: number, payload: SumPayload) {
    const newAmount = payload.type === 'incr' ? amount + 1 : amount - 1;

    try {
      return await postOrder(newAmount, payload.signal);
    } catch (err) {
      console.error('postOrder throw: ', err);
      return prev;
    }
  }
}

interface CheckoutState {
  amount: number;
  error?: string;
}
function OrderCalcCheckout() {
  const [state, dispath, isPending] = useActionState(amountReducer, { amount: 0 });
  const [opAmount, setOpAmount] = useOptimistic(state.amount);
  const abort = useRef<AbortController>(null);

  const sum = state.amount * 1000;

  return <OrderCalculator title={'Checkout'} amount={opAmount} sum={sum} isPending={isPending} onUpdate={handleUpdate} />;

  function handleUpdate(type: CalcOP) {
    if (abort.current != null) {
      abort.current.abort('waittolong');
    }
    abort.current = new AbortController();
    startTransition(() => {
      setOpAmount(type === 'incr' ? opAmount + 1 : opAmount - 1);
      dispath({ type, signal: abort.current?.signal });
    });
  }
}

async function amountReducer(prevState: CheckoutState, payload: SumPayload): Promise<CheckoutState> {
  let newAmount;
  if (payload.type === 'incr') {
    newAmount = prevState.amount + 1;
  } else {
    newAmount = prevState.amount - 1;
  }

  try {
    await postOrder(newAmount, payload.signal);
    return { amount: newAmount };
  } catch (e: any) {
    if (e === 'waittolong') {
      /* 当前被abort时，说明当前操作未完成并且下一个操作已schedule,那么
      直接执行下一个操作 */

      return { amount: newAmount };
    }

    console.error('postOrder throw: ', e);
    return { ...prevState, error: e };
  }
}

interface SumPayload {
  type: CalcOP;
  signal?: AbortSignal;
}
