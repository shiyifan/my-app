import { useEffect, useRef } from 'react';
import styles from './GreetDialog.module.css';

export default function GreetDialog() {
  const dlgDom = useRef<HTMLDialogElement>(null);

  return (
    <div className={styles['greet-dialog']}>
      <button onClick={() => dlgDom.current?.showModal()}>Show Dialog</button>
      <dialog ref={dlgDom}>
        <form method="dialog">
          <h1>Hello! from dialog</h1>
          <button type="submit">OK!</button>
        </form>
      </dialog>
    </div>
  );
}
