import { beatlesAlbums } from './data';
export { type Album } from './data';

/** This can be aborted */
export function postOrder(amount: number, signal?: AbortSignal): Promise<number> {
  const randTO = randTimeout();

  if (signal == null) {
    return new Promise(resolve => {
      setTimeout(() => resolve(amount), randTO);
    });
  }

  return createAbortablePromise((resolve, reject) => {
    setTimeout(() => {
      if (amount > 10) {
        reject({ message: 'too many orders', current: 11 });
      } else {
        resolve(amount);
      }
    }, randTO);
  }, signal);
}

let formCount = 0;
export function onlyAsync(signal?: AbortSignal) {
  const c = ++formCount;
  const randTO = randTimeout(5000);

  if (signal == null) {
    return new Promise<void>(resolve => {
      console.log(`(${c})post form...`);
      setTimeout(() => {
        resolve();
        console.log(`(${c})post form... end`);
      }, randTO);
    });
  }
  return createAbortablePromise<void>(resolve => {
    console.log('post form...');
    setTimeout(() => {
      resolve();
      console.log('post form...end');
    }, randTO);
  }, signal);
}

type ResolveFunc<T> = (value: T) => void;
type RejectFunc = (reason?: any) => void;

function createAbortablePromise<T>(
  executor: (resolve: ResolveFunc<T | PromiseLike<T>>, reject: RejectFunc) => void,
  abortSignal: AbortSignal,
): Promise<T> {
  if (abortSignal.aborted) {
    return Promise.reject('aborted, reason: ' + abortSignal.reason);
  }

  let onAbort: () => void;
  return new Promise<T>((res, rej) => {
    executor(res, rej);
    onAbort = () => rej(abortSignal?.reason);
    abortSignal.addEventListener('abort', onAbort);
  }).finally(() => {
    abortSignal.removeEventListener('abort', onAbort);
  });
}

/* timeout range: [500, 1500]ms */
function randTimeout(min = 500, range = 1000) {
  return Math.floor(Math.random() * range + min);
}

const cachedAlbums = new Map();
export function postAlbums(url: string) {
  if (cachedAlbums.get(url) != null) {
    return cachedAlbums.get(url);
  }

  const albums = getAlbums(url);
  cachedAlbums.set(url, albums);
  return albums;

  async function getAlbums(url: string) {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    const y = url.substring(url.lastIndexOf('/') + 1);
    if (y === '' || isNaN(Number(y))) return [];

    return beatlesAlbums.filter(a => a.year === Number(y));
  }
}
