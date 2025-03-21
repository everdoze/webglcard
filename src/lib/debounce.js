export default function (callback, delay = 200) {
  let timeout;
  return function () {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  }
}