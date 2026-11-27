import { Suspense, use, useState, startTransition, useDeferredValue } from 'react';
import { postAlbums, type Album } from './requests';

export default function AlbumLoader() {
  const [input, setInput] = useState('');
  // const deferredInput = useDeferredValue(input);

  // const isPending = deferredInput !== input;

  return (
    <div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      {/* {isPending && '...'} */}
      {
        <Suspense fallback={<h3>Loading...</h3>}>
          <Albums suffix={input} />
        </Suspense>
      }
    </div>
  );
}

function Albums({ suffix }: { suffix: string }) {
  const albums = use<Album[]>(postAlbums(`/albums/${suffix}`));

  const items = albums.map(a => {
    return (
      <li key={a.id}>
        {a.title}({a.year})
      </li>
    );
  });

  return <ul>{items}</ul>;
}
