import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import styles from './Posts.module.css';

export default function Posts() {
  const [userId, setUserId] = useState<number | null>(null);
  const postData = usePostData(userId);

  return (
    <div className={styles['posts-wrapper']}>
      <PostSearchCriteria onSearch={newId => setUserId(newId)} />
      <PostList postData={postData} />
    </div>
  );
}

function PostSearchCriteria({ onSearch }: { onSearch: (userId: number) => void }) {
  const [inputId, setInputId] = useState('');

  const queryDisable = inputId === '' || isNaN(Number(inputId));

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={inputId} onChange={e => setInputId(e.target.value)} />
      <button disabled={queryDisable} onClick={() => onSearch(Number(inputId))}>
        Query
      </button>
    </form>
  );

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (queryDisable) return;

    onSearch(Number(inputId));
  }
}

function PostList({ postData }: { postData: Post[] }) {
  const items = postData.map(p => <PostItem post={p} key={p.id} />);

  return (
    <section>
      <table>
        <tbody>{items}</tbody>
      </table>
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

const URL = 'https://jsonplaceholder.typicode.com/posts?';
function usePostData(userId: number | null) {
  const [data, setData] = useState<Post[]>([]);
  // const [pending, setPending] = useState(false);

  useEffect(() => {
    if (userId == null) return;

    let ignore = false;
    const url = `${URL}userId=${userId}`;
    requestData(url).then(r => {
      if (ignore) return;
      setData(r);
    });

    return () => void (ignore = true);
  }, [userId]);

  return data;
}

async function requestData(url: string): Promise<Post[]> {
  try {
    const result = fetch(url).then(r => r.json());
    return result;
  } catch (e) {
    console.error('request post error', e);
    return [];
  }
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
