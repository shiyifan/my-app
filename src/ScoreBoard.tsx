import { useEffect, useState, type ChangeEvent } from 'react';
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
  const [prevItems, setPrevItems] = useState(items);

  if (prevItems !== items) {
    // updating the state during render will make React re-render current component immediately,
    // throwing away the result returned by current call

    setSelected(null);
    setPrevItems(items);
    return;
  }

  const scores = [];
  for (const i of items) {
    scores.push(
      <tr key={i.id} className={styles['score-list-item']}>
        <td>
          <input type="checkbox" checked={selected === i.id} onChange={() => handleCheckedChange(i.id)} />
        </td>
        <td>
          <span>{i.category}</span>
        </td>
        <td>
          <span>{i.score}</span>
        </td>
      </tr>,
    );
  }

  return (
    <table className={styles['score-table']}>
      <tbody>{scores}</tbody>
    </table>
  );

  function handleCheckedChange(id: number) {
    setSelected(selected === id ? null : id);
  }
}

interface ScoreItem {
  id: number;
  category: 'list' | 'tree' | 'graph';
  score: number;
}
