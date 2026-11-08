import { useImperativeHandle, useRef, useState } from 'react';
import styles from './StopWatch.module.css';

export default function StopWatch() {
  const [now, setNow] = useState(Date.now());
  const [startTime, setStartTime] = useState(now);
  const [showing, setShowing] = useState(true);
  const intervalId = useRef(0);

  const h1Ref = useRef<HTMLHeadingElement>(null);

  const elapsedInSec = ((now - startTime) / 1000).toFixed(3);

  return (
    <div className={styles['stopwatch']}>
      {showing && (
        <h1 ref={h1Ref} className={styles['stopwatch-timepassed']}>
          Time passed: {elapsedInSec}
        </h1>
      )}
      <button className={styles['stopwatch-start']} onClick={handleStart}>
        Start
      </button>
      <button className={styles['stopwatch-start']} onClick={handleStop}>
        Stop
      </button>

      <button onClick={() => setShowing(!showing)}>Show</button>
      <button
        onClick={() => {
          console.log('h1Ref: ', h1Ref);
        }}
      >
        Inspect
      </button>
    </div>
  );

  function handleStart() {
    const n = Date.now();
    setStartTime(n);
    setNow(n);

    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalId.current);
  }
}
