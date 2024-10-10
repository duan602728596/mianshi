import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给出集合 [1,2,3,...,n]，其所有元素共有 n! 种排列。
 * 按大小顺序列出所有排列情况，并一一标记，当 n = 3 时, 所有排列如下：
 *   1、"123"
 *   2、"132"
 *   3、"213"
 *   4、"231"
 *   5、"312"
 *   6、"321"
 * 给定 n 和 k，返回第 k 个排列。
 */

/**
 * @param { number } n
 * @param { number } k
 * @return { string }
 */
function getPermutation(n, k) {
  let result = null;
  let index = 0;

  /**
   * 创建排列
   * @param { string } value - 拼接字符串的值
   */
  function create(value) {
    if (value.length === n) {
      index += 1;

      if (index === k) result = value;

      return;
    }

    for (let i = 1; i <= n; i++) {
      if (!value.includes(String(i))) {
        create(`${ value }${ i }`);
      }

      if (result !== null) break;
    }
  }

  for (let i = 1; i <= n; i++) {
    create(String(i));

    if (result !== null) break;
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(getPermutation(3, 3), '213');
});

test('Case 2', function() {
  deepStrictEqual(getPermutation(4, 9), '2314');
});

test('Case 3', function() {
  deepStrictEqual(getPermutation(3, 1), '123');
});