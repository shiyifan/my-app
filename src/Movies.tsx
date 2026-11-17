import styles from './Movies.module.scss';

export default function Movies() {
  return (
    <div className={styles['movies']}>
      <div className={styles['movies-selector-wrapper']}>
        <button className={styles['movies-selector']}>Ai No Corida</button>
        <button className={styles['movies-selector']}>午夜凶铃</button>
        <button className={styles['movies-selector']}>Trainspotting</button>
      </div>
      <hr />
    </div>
  );
}

function slowdown() {
  const start = performance.now();
}
