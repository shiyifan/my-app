import { useContext, useReducer, type ReactElement } from 'react';
import { ApiKeyContext } from './contexts';

export default function ApiKeyProvider({ children }: { children: ReactElement }) {
  const [apiKey, dispatchApiKey] = useReducer(requestNewApiKey, randStr());

  return <ApiKeyContext value={{ apiKey, update: dispatchApiKey }}>{children}</ApiKeyContext>;
}

function requestNewApiKey(apiKey: string) {
  return randStr(8);
}

function randStr(length: number = 8) {
  const chars = '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    result += randomChar;
  }

  return result;
}

/* custom hook */
export function useApiKey() {
  return useContext(ApiKeyContext).apiKey;
}

export function useApiKeyUpdate() {
  return useContext(ApiKeyContext).update;
}
