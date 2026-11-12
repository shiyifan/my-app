import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import styles from './Posts.module.css';

export default function Posts() {
  const [userId, setUserId] = useState<number | null>(null);
  // const [postDataDecl, loading] = usePostData(userId);

  const [postData, setPostData] = useState<Post[]>([]);

  return (
    <div className={styles['posts-wrapper']}>
      <PostSearchCriteria loading={false} onQueryDecl={newId => setUserId(newId)} onQuery={handleQuery} />

      <PostList postData={postData} />
      {/* <PostList postData={postDataDecl} /> */}
    </div>
  );

  async function handleQuery(inputId: number) {
    let ignore = false;

    const url = `${URL}userId=${inputId}`;
    const data = await requestData(url);

    if (ignore) return;

    setPostData(data);
  }
}

function PostSearchCriteria({
  loading,
  onQueryDecl,
  onQuery,
}: {
  loading: boolean;
  onQueryDecl: (userId: number) => void;
  onQuery: (userId: number) => void;
}) {
  const [inputId, setInputId] = useState('');

  const queryDisable = inputId === '' || isNaN(Number(inputId));

  return (
    <form className={styles['post-criteria']} onSubmit={handleSubmit}>
      <input className={styles['post-criteria-input-id']} type="number" value={inputId} onChange={e => setInputId(e.target.value)} />
      <button disabled={queryDisable} onClick={() => onQueryDecl(Number(inputId))}>
        Query(Declarative)
      </button>
      <button onClick={() => onQuery(Number(inputId))}>Query</button>
      {loading && <span>loading...</span>}
    </form>
  );

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (queryDisable) return;

    onQueryDecl(Number(inputId));
  }
}

function PostList({ postData }: { postData: Post[] }) {
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

const URL = 'https://jsonplaceholder.typicode.com/posts?';
function usePostData(userId: number | null) {
  const [data, setData] = useState<Post[]>([]);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (userId == null) return;

    let ignore = false;
    const url = `${URL}userId=${userId}`;
    setPending(true);
    requestData(url).then(r => {
      setTimeout(() => setPending(false), 500);
      if (ignore) return;
      setData(r);
    });

    return () => void (ignore = true);
  }, [userId]);

  return [data, pending] as const;
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
