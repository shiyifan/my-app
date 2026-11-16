import { useState, type ReactNode } from 'react';
import styles from './FancyWrapper.module.scss';

export default function FancyWrapper({ chd: chd }: { chd: ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <div className={styles['fancy-wrapper']}>
      <button className={styles['fancy-wrapper-btn']} onClick={() => setCount(n => n + 1)}>
        Fancy({count})
      </button>
      {chd}
    </div>
  );
}
