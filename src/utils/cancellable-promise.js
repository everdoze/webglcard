export function cancelablePromise(executor) {
  let cancel;
  
  const promise = new Promise((resolve, reject) => {
    cancel = () => reject('Cancelled');
    executor(resolve, reject);
  });
  
  return { promise, cancel };
}