import { useState, type ChangeEvent } from 'react';
import { scores } from './data';
import styles from './ScoreBoard.module.css';

export default function ScoreBoard() {
  const [isAsc, setIsAsc] = useState(true);

  let sorted;
  if (isAsc) {
    sorted = scores.toSorted((a, b) => a.score - b.score);
  } else {
    sorted = scores.toSorted((a, b) => b.score - a.score);
  }

  return (
    <div className={styles['score-board']}>
      <button className={styles['sorted']} onClick={() => setIsAsc(!isAsc)}>
        Sorted
      </button>

      {sorted.length > 0 && <ScoreList items={sorted} />}
    </div>
  );
}

function ScoreList({ items }: { items: ScoreItem[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  const scores = [];
  for (const i of items) {
    scores.push(
      <li key={i.id} className={styles['score-list-item']}>
        <label>
          <input type="checkbox" checked={selected === i.id} onChange={e => handleCheckedChange(i.id, e)} />
          <span>{i.category}</span>
          <span>{i.score}</span>
        </label>
      </li>,
    );
  }

  return <ul>{scores}</ul>;

  function handleCheckedChange(id: number, e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  }
}

interface ScoreItem {
  id: number;
  category: 'list' | 'tree' | 'graph';
  score: number;
}
