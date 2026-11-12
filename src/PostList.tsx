import styles from './PostList.module.css';

export default function PostList({ postData }: { postData: Post[] }) {
  const items = postData.map(p => <PostItem post={p} key={p.id} />);

  return (
    <section>
      <div className={styles['post-list-wrapper']}>
        <table className={styles['post-list']}>
          <tbody>{items}</tbody>
        </table>
      </div>
    </section>
  );
}

function PostItem({ post }: { post: Post }) {
  return (
    <tr>
      <th>{post.userId}</th>
      <td>
        <div className={styles['post-wrapper']}>
          <h1 className={styles['post-header']}>{post.title}</h1>
          <p className={styles['post-content']}>{post.body}</p>
        </div>
      </td>
    </tr>
  );
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
