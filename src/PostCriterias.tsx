import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import styles from './PostCriterias.module.css';

export function PostSearchCriteriaDecl({
  loading,
  userId,
  onUserIdChange,
}: {
  loading: boolean;
  userId: number | null;
  onUserIdChange: (userId: number | null) => void;
}) {
  return (
    <form className={styles['post-criteria']} onSubmit={handleSubmit}>
      <input
        className={styles['post-criteria-input-id']}
        type="number"
        value={userId ?? undefined}
        onChange={handleChange}
      />
      {loading && <span>loading...</span>}
    </form>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    const v = e.target.value;

    if (v === '' || isNaN(Number(v))) {
      onUserIdChange(null);
    } else {
      onUserIdChange(Number(v));
    }
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }
}

export function PostSearchCriteria({ loading, onQuery }: { loading: boolean; onQuery: (userId: number) => void }) {
  const [inputId, setInputId] = useState('');

  const queryDisable = inputId === '' || isNaN(Number(inputId));

  return (
    <form className={styles['post-criteria']} onSubmit={handleSubmit}>
      <input
        className={styles['post-criteria-input-id']}
        type="number"
        value={inputId}
        onChange={e => setInputId(e.target.value)}
      />

      <button type="submit" disabled={queryDisable} onClick={() => !queryDisable && onQuery(Number(inputId))}>
        Query
      </button>
      {loading && <span>loading...</span>}
    </form>
  );

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
  }
}
