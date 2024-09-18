/**
 * 实现一个洋葱模型
 * @param { Array<Function> } funcs
 * @param { object } ctx
 */
function compose(funcs = [], ctx = {}) {
  /**
   * @param { number } index
   */
  function dispatch(index) {
    if (funcs.length === 0) return;

    if (index === funcs.length - 1) {
      return () => funcs.at(-1)(ctx, () => { /* noop */ });
    }

    return () => funcs[index](ctx, dispatch(index + 1));
  }

  return dispatch(0)();
}

function consoleLog(num) {
  return function(ctx, next) {
    console.log('Start: ', num);
    next();
    console.log('End: ', num);
  };
}

compose([
  consoleLog(1),
  consoleLog(2),
  consoleLog(3),
  consoleLog(4),
  consoleLog(5)
]);