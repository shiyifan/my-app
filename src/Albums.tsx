import { Suspense, use, useState } from 'react';
import { postAlbums, type Album } from './requests';

export default function AlbumLoader() {
  const [input, setInput] = useState('');

  return (
    <div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
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
