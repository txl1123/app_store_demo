export default function throttle(fn, wait, scope) {
  wait || (wait = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;
    var now = + new Date(),
        args = arguments;
    if (last && now < last + wait) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, wait);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}