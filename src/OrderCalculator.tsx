import styles from './OrderCalc.module.scss';

export default function OrderCalculator({ title, amount, sum, onUpdate, isPending }: OrderCalculatorProp) {
  return (
    <div className={styles['order-calc']}>
      <h3 className={styles['order-calc-title']}>{title}</h3>
      <div className={styles['order-calc-board']}>
        <button className={styles['order-calc-btn']} onClick={() => onUpdate('incr')}>
          +
        </button>
        <span className={styles['order-calc-amount']}>{amount}</span>
        <button className={styles['order-calc-btn']} onClick={() => onUpdate('decr')}>
          -
        </button>
      </div>
      <p className={styles['order-calc-sum']}>
        {sum}
        {isPending && '...'}
      </p>
    </div>
  );
}

interface OrderCalculatorProp {
  title: string;
  amount: number;
  sum: number;
  isPending: boolean;
  onUpdate: (type: CalcOP) => void;
}

export type CalcOP = 'incr' | 'decr';
