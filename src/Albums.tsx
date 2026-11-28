import { Suspense, use, useState } from 'react';
import { postAlbums } from './requests';
import type { Album } from './data';
import { slowdown } from './utils';

export default function AlbumLoader() {
  const [input, setInput] = useState('');
  // const deferredInput = useDeferredValue(input);

  // const isPending = deferredInput !== input;

  const albumsJsx = <Albums suffix={input} />;
  console.log('jsx: ', albumsJsx);

  return (
    <div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      {/* {isPending && '...'} */}
      {
        <Suspense fallback={<h3>Loading...</h3>}>
          {/* <Albums suffix={input} /> */}
          {albumsJsx}
        </Suspense>
      }
    </div>
  );
}

function Albums({ suffix }: { suffix: string }) {
  const p = postAlbums(`/albums/${suffix}`);
  console.log('p: ', Object.assign({}, p));
  const albums = use<Album[]>(p);

  const items = albums.map(a => {
    return (
      <li key={a.id}>
        {a.title}({a.year})
      </li>
    );
  });

  return <ul>{items}</ul>;
}
