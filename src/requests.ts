/** This can be aborted */
export function postOrder(amount: number, signal?: AbortSignal): Promise<number> {
  const randTO = randTimeout();

  if (signal == null) {
    return new Promise(resolve => {
      setTimeout(() => resolve(amount), randTO);
    });
  }

  if (signal.aborted) {
    return Promise.reject('post aborted, reason: ' + signal.reason);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount > 10) {
        reject({ message: 'too many orders', current: 11 });
      } else {
        resolve(amount);
      }
      signal.removeEventListener('abort', onAbort);
    }, randTO);

    signal.addEventListener('abort', onAbort);

    function onAbort() {
      console.error('postOrder aborted!');
      reject(signal?.reason);
    }
  });
}

export function postFormRequest() {}

type ResolveFunc<T> = (value: T) => void;
type RejectFunc = (reason?: any) => void;

function createAbortablePromise<T>(
  executor: (resolve: ResolveFunc<T | PromiseLike<T>>, reject: RejectFunc) => void,
  signal: AbortSignal,
): Promise<T> {
  if (signal.aborted) {
    return Promise.reject('aborted, reason: ' + signal.reason);
  }

  const userPromise = new Promise((res, rej) => {
    executor(res, rej);
    signal.addEventListener('abort', onAbort);
  }).finally(() => {
    signal.removeEventListener('abort', onAbort);
  });

  return new Promise<T>((res, rej) => {
    executor(res, rej);

    signal.addEventListener('abort', onAbort);
  });

  function onAbort() {
    // rej(signal?.reason);
  }
}

/* timeout range: [500, 1500]ms */
function randTimeout() {
  return Math.floor(Math.random() * 1000 + 500);
}
