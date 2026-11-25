import styles from './Books.module.scss';

export default function Books() {
  return (
    <div className={styles['books-wrapper']}>
      <input type="text" />
      <ul>
        <li>Black And Red</li>
        <li>Two Cities</li>
        <li>The Tale Of American</li>
        <li>The Call Of Cathulu</li>
      </ul>
    </div>
  );
}

function BookItem({ name }: { name: string }) {
  return <li>{name}</li>;
}
