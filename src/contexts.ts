import { createContext } from 'react';

export const AppContext = createContext({
  apiKey: '__default_key__',
  update: (() => {
    throw new Error('not implemented');
  }) as () => void | never,
});

export const PlayerContext = createContext({ serverLocation: '??' });
