import { startTransition, useActionState, useOptimistic, useRef, useState, useTransition } from 'react';
import styles from './OrderCalc.module.scss';
import { postOrder } from './requests';
import OrderCalculator, { type CalcOP } from './OrderCalculator';
import OptimisticForm from './OptimisticForm';
import Books from './Books';

export default function OrderCalc() {
  return (
    <div className={styles['order-calc-wrapper']}>
      <h1>Order Calc</h1>
      <div className={styles['two-order-calc']}>
        <OrderCalcTransition />
        <OrderCalcActionState />
        <OrderCalcCheckout />
        <OptimisticForm />
        <Books />
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
          // dispathSum({ type, signal: abort.current?.signal });
          dispathSum({ type });
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
  const lastSuccess = useRef(0); // 保存上次请求成功的amount

  const sum = state.amount * 1000;

  return <OrderCalculator title={'Checkout'} amount={opAmount} sum={sum} isPending={isPending} onUpdate={handleUpdate} />;

  function handleUpdate(type: CalcOP) {
    if (abort.current != null) {
      abort.current.abort('waittolong');
    }
    abort.current = new AbortController();
    startTransition(() => {
      setOpAmount(type === 'incr' ? opAmount + 1 : opAmount - 1);
      dispath({ type, signal: abort.current?.signal, lastSuccess });
    });
  }
}

async function amountReducer(prevState: CheckoutState, payload: CheckoutPayload): Promise<CheckoutState> {
  let newAmount;
  if (payload.type === 'incr') {
    newAmount = prevState.amount + 1;
  } else {
    newAmount = prevState.amount - 1;
  }

  try {
    await postOrder(newAmount, payload.signal);
    payload.lastSuccess.current = newAmount; // 更新服务端已确认过的amount

    return { amount: newAmount };
  } catch (e: any) {
    if (e === 'waittolong') {
      /* 当前被abort时，说明当前操作未完成并且下一个操作已schedule,那么
      直接执行下一个操作.
      注意，这里虽然返回newAmount,但该值不一定被服务端真正地确认，这里仅仅
      假设"服务端能够确认newAmount", 为了后续请求确认累加的amount. */

      return { amount: newAmount };
    }

    console.error('postOrder throw: ', e);
    return { amount: payload.lastSuccess.current, error: e.message };
  }
}

interface SumPayload {
  type: CalcOP;
  signal?: AbortSignal;
}

interface CheckoutPayload extends SumPayload {
  /** 保存上一次成功请求的"amount",即服务端确认过的"amount".
   *  注意：被abort的请求虽然在reducer里返回新的amount（假定被abort的请求已
   * 成功执行,为了后续累加amount的新的请求）,但不是真正的成功的请求。 */
  lastSuccess: { current: number };
}
