import { useEffect, useRef, useState } from 'react';
import styles from './GreetDialog.module.css';

export default function GreetDialog() {
  const dlgDom = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    console.log('schedule...', text);
    const id = setTimeout(() => console.log(text), 3000);
    return () => {
      console.log('cancel: ', text);
      clearTimeout(id);
    };
  }, [text]);

  return (
    <div className={styles['greet-dialog']}>
      <button onClick={() => dlgDom.current?.showModal()}>Show Dialog</button>
      <dialog ref={dlgDom}>
        <form method="dialog">
          <h1>Hello! from dialog</h1>
          <label>
            <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} />
            Check this out
          </label>
          <br />
          <input type="text" onChange={e => setText(e.target.value)} value={text} />
          <button type="submit">OK!</button>
        </form>
      </dialog>
    </div>
  );
}
