import { useState } from 'react';
import styles from './PlayerBoard.module.css';

export default function PlayerBoard() {
  const [firstHidden, setFirstHidden] = useState(false);
  return (
    <div>
      <div className={styles['player-board']}>
        {!firstHidden && <ScoreCounter playerName="Ivan" />}
        <ScoreCounter playerName="Roosia" />
      </div>
      <label>
        <input type="checkbox" onChange={() => setFirstHidden(!firstHidden)} /> Remove the first player
      </label>
    </div>
  );
}

function ScoreCounter({ playerName }: { playerName: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className={styles['score-counter']}>
      <h1 className={styles['player-name']}>{playerName}</h1>
      <p className={styles['score']}>{count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
