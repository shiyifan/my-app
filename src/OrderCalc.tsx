import styles from './OrderCalc.module.scss';

export default function OrderCalc() {
  return (
    <div className={styles['order-calc-wrapper']}>
      <h1>Order Calc</h1>
      <div className={styles['two-order-calc']}>
        <div className={styles['order-calc']}>
          <div className={styles['order-calc-board']}>
            <button className={styles['order-calc-btn']}>+</button>
            <span>23</span>
            <button className={styles['order-calc-btn']}>-</button>
          </div>
          <span className={styles['order-sum']}></span>
        </div>
        <div className={styles['order-calc']}>
          <button className={styles['order-calc-btn']}>+</button>
          <span>23</span>
          <button className={styles['order-calc-btn']}>-</button>
        </div>
      </div>
    </div>
  );
}
