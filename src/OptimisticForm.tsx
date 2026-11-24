import { startTransition, useActionState, useOptimistic, useState, useTransition } from 'react';
import { onlyAsync } from './requests';
import styles from './OptimisticForm.module.scss';

export default function OpForm() {
  const [submitting, setSubmitting] = useOptimistic(false);
  const [t0Pending, startT0] = useTransition();
  const [t1Pending, startT1] = useTransition();

  const [c, setC] = useState(0);

  const [s, disp, _] = useActionState(async () => {
    await onlyAsync();
    return {};
  }, {});

  const [c2, setC2] = useState(0);

  return (
    <div className={styles['op-form']}>
      <button
        onClick={() => {
          setC2(c => {
            console.log('c2: ', c);
            return c + 1;
          });
          // startT0(async () => {
          //   setSubmitting(true);
          //   await onlyAsync();
          // });
        }}
      >
        T0{t0Pending && '...'}
      </button>
      {c2}
      <button
        onClick={() => {
          setC(c + 1);
          // startT1(() => disp());
          // startT1(async () => {
          //   await onlyAsync();
          // });
        }}
      >
        T1{t1Pending && '...'}
      </button>
      <span>{submitting && 'submitting...'}</span>
      <OneLine c={c} />
    </div>
  );
}

function OneLine({ c }: { c: number }) {
  const [t3Pending, startT3] = useTransition();
  const [op, setOp] = useOptimistic(false);

  const [n, setN] = useState(0);

  const [opC, updateOpC] = useOptimistic(c);
  // const [opC, updateOpC] = useOptimistic(c, c => {
  //   console.log('opC dispatch: ', c);
  //   return c + 1;
  // });

  return (
    <div>
      <button
        onClick={() =>
          startT3(async () => {
            updateOpC(opC => {
              console.log('opC updater: ', opC);
              return opC + 1;
            });
            // updateOpC(null);

            // setOp(true);
            await onlyAsync();
          })
        }
      >
        T3{t3Pending && '...'}
      </button>
      {opC}
      <button
        onClick={() => {
          startTransition(async () => {
            console.log('T4 trans...');
            setN(n => {
              console.log('T4 prev n: ', n);
              return n + 1;
            });
            await onlyAsync();
          });
        }}
      >
        T4
      </button>
      {n}
    </div>
  );

  async function formAction() {
    startT3(async () => {
      setOp(true);
    });
  }
}
