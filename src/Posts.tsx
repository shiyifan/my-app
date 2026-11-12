import { useEffect, useState } from 'react';
import styles from './Posts.module.css';
import { PostSearchCriteriaDecl, PostSearchCriteria } from './PostCriterias';
import PostList, { type Post } from './PostList';

export function PostsDecl() {
  const [userId, setUserId] = useState<number | null>(null);
  const [postData, loading] = usePostData(userId);

  return (
    <div className={styles['posts-wrapper']}>
      <h1 className={styles['posts-title']}>Declarative Posts</h1>

      <PostSearchCriteriaDecl loading={loading} onUserIdChange={setUserId} userId={userId} />
      <PostList postData={postData} />
    </div>
  );
}

export function Posts() {
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles['posts-wrapper']}>
      <h1 className={styles['posts-title']}>Imperative Posts</h1>

      <PostSearchCriteria onQuery={handleQuery} loading={loading} />
      <PostList postData={postData} />
    </div>
  );

  async function handleQuery(inputId: number) {
    let ignore = false;

    const url = `${URL}userId=${inputId}`;
    setLoading(true);
    const data = await requestData(url);
    setTimeout(() => setLoading(false), 500);

    if (ignore) return;

    setPostData(data);
  }
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
