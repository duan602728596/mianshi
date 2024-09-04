import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/* 实现自定义的Promise */
class CustomPromise {
  static Pending = 'pending';
  static Fulfilled = 'fulfilled';
  static Rejected = 'rejected';

  static resolve(v) {
    return new Promise((resolve) => resolve(v));
  }

  static reject(v) {
    return new Promise((resolve, reject) => reject(v));
  }

  static all(tasks) {
    const result = [];

    for (let i = 0; i < tasks.length; i++) {
      tasks[i].then((r) => {
        result.push(r);

        return r;
      });
    }

    return new Promise((resolve) => resolve(result));
  }

  PromiseState = CustomPromise.Pending; // promise状态
  PromiseResult = undefined; // promise结果

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  #returnNewPromise(result) {
    return new CustomPromise((resolve) => resolve(result));
  }

  resolve = (v) => {
    this.PromiseState = CustomPromise.Fulfilled;
    this.PromiseResult = v;
  };

  reject = (v) => {
    this.PromiseState = CustomPromise.Rejected;
    this.PromiseResult = v;
  };

  #then(options) {
    const { onFulfilled, onRejected } = options;
    let res = undefined;

    if (this.PromiseState === CustomPromise.Fulfilled && onFulfilled) {
      res = onFulfilled(this.PromiseResult);
    } else if (this.PromiseState === CustomPromise.Rejected && onRejected) {
      res = onRejected(this.PromiseResult);
    }

    return this.#returnNewPromise('result' in options ? options.result : res);
  }

  then = (onFulfilled, onRejected) => {
    return this.#then({ onFulfilled, onRejected });
  };

  catch = (onRejected) => {
    return this.#then({ onRejected });
  };

  finally = (onFinally) => {
    return this.#then({
      onFulfilled: onFinally,
      onRejected: onFinally,
      result: this.PromiseResult
    });
  };
}

test('Case 1', async function() {
  const promise = await new CustomPromise((resolve, reject) => {
    resolve(1);
  });

  deepStrictEqual(promise, 1);
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

test('Case 9: Promise.all', async function() {
  const promises = await CustomPromise.all([
    new CustomPromise((resolve) => resolve(31)),
    new CustomPromise((resolve) => resolve(32)),
    new CustomPromise((resolve) => resolve(33))
  ]);

  deepStrictEqual(promises, [31, 32, 33]);
});