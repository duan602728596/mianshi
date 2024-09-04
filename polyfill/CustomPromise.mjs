import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { setTimeout } from 'node:timers';
import { setTimeout as setTimeoutPromise } from 'node:timers/promises';

/* 实现自定义的Promise */
class CustomPromise {
  static Pending = 'pending';
  static Fulfilled = 'fulfilled';
  static Rejected = 'rejected';

  static resolve(v) {
    return new CustomPromise((resolve) => resolve(v));
  }

  static reject(v) {
    return new CustomPromise((resolve, reject) => reject(v));
  }

  static all(tasks) {
    let endTasks = 0;
    let nextPromiseResolve;
    const promise = new CustomPromise((resolve) => nextPromiseResolve = resolve);
    const result = [];

    for (let i = 0; i < tasks.length; i++) {
      tasks[i].then((r) => {
        result[i] = r;
        endTasks++;

        if (endTasks === tasks.length) {
          nextPromiseResolve(result);
        }

        return r;
      });
    }

    return promise;
  }

  PromiseState = CustomPromise.Pending; // promise状态
  PromiseResult = undefined; // promise结果
  #nextPromiseResolve = undefined;
  #nextPromiseOptions = undefined;

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  resolve = (v) => {
    this.PromiseState = CustomPromise.Fulfilled;
    this.PromiseResult = v;
    this.#nextPromiseCallback();
  };

  reject = (v) => {
    this.PromiseState = CustomPromise.Rejected;
    this.PromiseResult = v;
    this.#nextPromiseCallback();
  };

  #nextPromiseCallback() {
    if (this.#nextPromiseOptions) {
      const { onFulfilled, onRejected } = this.#nextPromiseOptions;
      let res = undefined;

      if (this.PromiseState === CustomPromise.Fulfilled && onFulfilled) {
        res = onFulfilled(this.PromiseResult);
      } else if (this.PromiseState === CustomPromise.Rejected && onRejected) {
        res = onRejected(this.PromiseResult);
      }

      this.#nextPromiseResolve('result' in this.#nextPromiseOptions ? this.#nextPromiseOptions.result : res);
    }
  }

  #then() {
    const promise = new CustomPromise((resolve) => {
      this.#nextPromiseResolve = resolve;
    });

    if (this.PromiseState !== CustomPromise.Pending) {
      this.#nextPromiseCallback();
    }

    return promise;
  }

  then = (onFulfilled, onRejected) => {
    this.#nextPromiseOptions = { onFulfilled, onRejected };

    return this.#then();
  };

  catch = (onRejected) => {
    this.#nextPromiseOptions = { onRejected };

    return this.#then();
  };

  finally = (onFinally) => {
    this.#nextPromiseOptions = {
      onFulfilled: onFinally,
      onRejected: onFinally,
      result: this.PromiseResult
    };

    return this.#then();
  };
}

test.describe('Case 1: Promise resolve', function() {
  test('sync', async function() {
    const promise = await new CustomPromise((resolve, reject) => {
      resolve(1);
    });

    deepStrictEqual(promise, 1);
  });

  test('async', async function() {
    const promise = await new CustomPromise(async (resolve, reject) => {
      const r = await setTimeoutPromise(3_000, 1);

      resolve(r);
    });

    deepStrictEqual(promise, 1);
  });
});

test('Case 2', async function() {
  const promise = await new CustomPromise((resolve, reject) => {
    resolve(1);
  }).then((result) => {
    return result + 2;
  });

  deepStrictEqual(promise, 3);
});

test('Case 3', async function() {
  let errResult;

  try {
    await new CustomPromise((resolve, reject) => {
      reject(3);
    });
  } catch (err) {
    errResult = err;
  }

  deepStrictEqual(errResult, 3);
});

test('Case 4', async function() {
  let errResult;

  try {
    await new CustomPromise((resolve, reject) => {
      throw new Error(4);
    });
  } catch (err) {
    errResult = err;
  }

  deepStrictEqual(errResult.message, '4');
});

test('Case 5', async function() {
  const promise = await new CustomPromise((resolve, reject) => {
    reject(5);
  }).catch((result) => {
    return result + 2;
  });

  deepStrictEqual(promise, 7);
});

test('Case 6', async function() {
  let result;

  const promise = await new CustomPromise((resolve, reject) => {
    resolve(6);
  }).finally(() => {
    result = 7;
  });

  deepStrictEqual(promise, 6);
  deepStrictEqual(result, 7);
});

test('Case 7: Promise.resolve', async function() {
  const promise = await CustomPromise.resolve(7);

  deepStrictEqual(promise, 7);
});

test('Case 8: Promise.reject', async function() {
  let errResult;

  try {
    await CustomPromise.reject(8);
  } catch (err) {
    errResult = err;
  }

  deepStrictEqual(errResult, 8);
});

test.describe('Case 9: Promise.all', function() {
  test('sync', async function() {
    const promises = await CustomPromise.all([
      new CustomPromise((resolve) => resolve(31)),
      new CustomPromise((resolve) => resolve(32)),
      new CustomPromise((resolve) => resolve(33))
    ]);

    deepStrictEqual(promises, [31, 32, 33]);
  });

  test('async', async function() {
    const promises = await CustomPromise.all([
      new CustomPromise((resolve) => setTimeout(() => resolve(34), 2_000)),
      new CustomPromise((resolve) => setTimeout(() => resolve(35), 3_000)),
      new CustomPromise((resolve) => setTimeout(() => resolve(36), 1_000))
    ]);

    deepStrictEqual(promises, [34, 35, 36]);
  });
});