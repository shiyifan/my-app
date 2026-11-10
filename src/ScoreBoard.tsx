import { useState, type ChangeEvent } from 'react';
import { scores } from './data';
import styles from './ScoreBoard.module.css';

export default function ScoreBoard() {
  return <ScoreList items={scores} />;
}

function ScoreList({ items }: { items: ScoreItem[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  if (items.length === 0) {
    return null;
  }

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
