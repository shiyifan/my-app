import { memo, useState, useTransition, type ReactNode } from 'react';
import styles from './Movies.module.scss';

export default function Movies() {
  const [selected, setSelected] = useState<'ring' | 'ainocorrida' | 'transpotting'>('ainocorrida');
  const [show, setShow] = useState(false);
  const [fangHua, setFangHua] = useState(true);

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState({ name: '' });

  return (
    <div className={styles['movies']}>
      <div className={styles['movies-selector-wrapper']}>
        <TransitionButton
          isActive={selected === 'ainocorrida'}
          action={() => {
            setSelected('ainocorrida');
            setShow(s => !s);
          }}
        >
          Ai No Corida
        </TransitionButton>
        <TransitionButton
          isActive={selected === 'ring'}
          action={() => {
            setSelected('ring');
            setShow(s => !s);
            setFirst(n => n + 1);
          }}
        >
          午夜凶铃
        </TransitionButton>
        <TransitionButton isActive={selected === 'transpotting'} action={() => setSelected('transpotting')}>
          Trainspotting
        </TransitionButton>

        <TransitionButton
          isActive={false}
          action={() => {
            setShow(s => !s);
            setFirst(n => n + 1);
          }}
        >
          钢的琴
        </TransitionButton>

        <p>{first}</p>

        {/* <button onClick={() => setFangHua(f => !f)}>芳华</button> */}
        <TransitionButton
          isActive={false}
          action={() => {
            setFangHua(f => !f);
            setFirst(n => ++n);
          }}
        >
          芳华
        </TransitionButton>
      </div>
      <hr />

      {selected === 'ring' && <Ring />}
      {selected === 'ainocorrida' && <AiNoCorrida />}
      {selected === 'transpotting' && <Trainspotting />}
      {show && <Piano />}
      {fangHua && <FangHua />}
    </div>
  );
}

function AiNoCorrida() {
  return <h1>Ai No Corrida</h1>;
}

function Trainspotting() {
  console.log('Trainspotting rendering');
  return <h1 style={{ color: 'hsl(240.35deg 74.43% 71.9%)' }}>Transpotting</h1>;
}

function Piano() {
  console.log('Piano rendering');
  return <h1 style={{ color: 'green' }}>钢的琴</h1>;
}

const Ring = memo(function Ring() {
  let rings = [];
  for (let i = 0; i < 5; i++) {
    rings.push(<RingItem key={i} index={i} />);
  }
  return <ul className={styles['ring']}>{rings}</ul>;
});

function RingItem({ index }: { index: number }) {
  console.log(`ring${index} rendering`);
  slowdown(300);
  return <li>RingRingRing...</li>;
}

const FangHua = memo(function FangHua() {
  console.log('fanghua rendering');
  slowdown(1000);

  return <h1>芳华</h1>;
});

interface TransitionButtonProp {
  action: () => void | Promise<any>;
  children: string;
  isActive: boolean;
}

function TransitionButton({ action, children, isActive }: TransitionButtonProp) {
  const [isPending, startTransition] = useTransition();

  if (isActive) {
    return (
      <b className={styles['transition-btn__actived']}>
        <span>{children}</span>
      </b>
    );
  }

  return (
    <button className={styles['transition-btn']} onClick={handleClick}>
      {children}
    </button>
  );

  function handleClick() {
    startTransition(async () => {
      await action();
    });
    // action();
  }
}

function slowdown(duration: number) {
  const start = performance.now();
  while (performance.now() - start < duration);
}
