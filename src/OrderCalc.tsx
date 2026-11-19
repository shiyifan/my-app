import { useState, useTransition } from 'react';
import styles from './OrderCalc.module.scss';

export default function OrderCalc() {
  return (
    <div className={styles['order-calc-wrapper']}>
      <h1>Order Calc</h1>
      <div className={styles['two-order-calc']}>
        <OrderCalcTransition />
        <OrderCalcActionState />
      </div>
    </div>
  );
}

function OrderCalcTransition() {
  const [amount, setAmount] = useState(0);
  const [sum, setSum] = useState(0);
  const [isPending, startTransition] = useTransition();

  return (
    <OrderCalculator
      title="Transition"
      amount={amount}
      sum={sum}
      onUpdate={type => {
        setAmount(type === 'incr' ? amount + 1 : amount - 1);
        startTransition(() => {});
      }}
    />
  );
}

function OrderCalcActionState() {
  return <OrderCalculator title="ActionState" amount={1} sum={1000} onUpdate={() => {}} />;
}

function OrderCalculator({ title, amount, sum, onUpdate }: OrderCalculatorProp) {
  return (
    <div className={styles['order-calc']}>
      <h3 className={styles['order-calc-title']}>{title}</h3>
      <div className={styles['order-calc-board']}>
        <button className={styles['order-calc-btn']}>+</button>
        <span className={styles['order-calc-amount']}>{amount}</span>
        <button className={styles['order-calc-btn']}>-</button>
      </div>
      <p className={styles['order-calc-sum']}>{sum}</p>
    </div>
  );
}

interface OrderCalculatorProp {
  title: string;
  amount: number;
  sum: number;
  onUpdate: (type: 'incr' | 'decr') => void;
}
