import { books } from './data';
import styles from './Books.module.scss';
import { memo, useDeferredValue, useId, useState } from 'react';

export default function Books() {
  const [bookCount, setBookCount] = useState('');
  const defCount = useDeferredValue(bookCount);
  const id = useId();

  let bookListDom;
  if (defCount === '' || isNaN(Number(defCount))) {
    bookListDom = null;
  } else {
    bookListDom = <BookList count={Number(defCount)} />;
  }

  return (
    <div className={styles['books-wrapper']}>
      <div className={styles['books-count']}>
        <label htmlFor={id + 'bookcount'}>Book Count:</label>
        <input id={id + 'bookcount'} type="number" value={bookCount} onChange={e => setBookCount(e.target.value)} />
        {defCount !== bookCount && '...'}
      </div>

      {bookListDom}
    </div>
  );
}

const BookList = memo(function BookList({ count }: { count: number }) {
  const items = [];
  for (let i = 0; i < count; i++) {
    const b = books[i % books.length];
    items.push(<BookItem key={i} book={b} />);
  }

  return <ol className={styles['books-list']}>{items}</ol>;
});

function BookItem({ book }: { book: (typeof books)[number] }) {
  return (
    <li>
      <p className={styles['book']}>
        <span className={styles['book-name']}>{book.name}</span>
        <span className={styles['book-author']}>{book.author}</span>
      </p>
    </li>
  );
}
