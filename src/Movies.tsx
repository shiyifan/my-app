import { useState, useTransition, type ReactNode } from 'react';
import styles from './Movies.module.scss';

export default function Movies() {
  const [selected, setSelected] = useState<'ring' | 'ainocorrida' | 'transpotting'>('ainocorrida');

  return (
    <div className={styles['movies']}>
      <div className={styles['movies-selector-wrapper']}>
        <TransitionButton isActive={selected === 'ainocorrida'} action={() => setSelected('ainocorrida')}>
          Ai No Corida
        </TransitionButton>
        <TransitionButton isActive={selected === 'ring'} action={() => setSelected('ring')}>
          午夜凶铃
        </TransitionButton>
        <TransitionButton isActive={selected === 'transpotting'} action={() => setSelected('transpotting')}>
          Trainspotting
        </TransitionButton>
      </div>
      <hr />

      {selected === 'ring' && <Ring />}
      {selected === 'ainocorrida' && <AiNoCorrida />}
      {selected === 'transpotting' && <Trainspotting />}
    </div>
  );
}

function AiNoCorrida() {
  return <h1>Ai No Corrida</h1>;
}

function Trainspotting() {
  return <h1 style={{ color: 'hsl(240.35deg 74.43% 71.9%)' }}>Transpotting</h1>;
}

function Ring() {
  let rings = [];
  for (let i = 0; i < 500; i++) {
    rings.push(<RingItem key={i} />);
  }
  return <ul className={styles['ring']}>{rings}</ul>;
}

function RingItem() {
  slowdown(1);
  return <li>RingRingRing...</li>;
}

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

  return <button onClick={handleClick}>{children}</button>;

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
