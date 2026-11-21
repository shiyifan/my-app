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

export function postFormRequest() {}

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
function randTimeout() {
  return Math.floor(Math.random() * 1000 + 500);
}
