import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。
 * 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
 */

/**
 * 判断数组内内容相同
 * @param { Array<number> } a
 * @param { Array<number> } b
 */
function isArrayItemsSame(a, b) {
  if (a.length !== b.length) return false;

  const cacheMap = {};

  for (let i = 0; i < a.length; i++) {
    const [k1, k2] = [String(a[i]), String(b[i])];

    cacheMap[k1] ??= 0;
    cacheMap[k2] ??= 0;

    cacheMap[k1] += 1;
    cacheMap[k2] -= 1;
  }

  return Object.values(cacheMap).every((o) => o === 0);
}

/**
 * @param { Array<number> } candidates
 * @param { number } target
 * @return { Array<number[]> }
 */
function combinationSum(candidates, target) {
  const result = [];

  /**
   * @param { Array<number> } array - 整数数组
   * @param { number } sumNumber - 和
   */
  function search(array, sumNumber) {
    if (sumNumber > target) return; // 大于

    if (sumNumber === target) {
      if (!result.some((o) => isArrayItemsSame(o, array))) {
        result.push(array);
      }

      return;
    }

    for (const n of candidates) {
      search([...array, n], sumNumber + n);
    }
  }

  for (const n of candidates) {
    search([n], n);
  }

  return result;
}

test('Case 1', function() {
  const value = combinationSum([2, 3, 6, 7], 7);

  deepStrictEqual(value, [[2, 2, 3], [7]]);
});

test('Case 2', function() {
  const value = combinationSum([2, 3, 5], 8);

  deepStrictEqual(value, [[2, 2, 2, 2], [2, 3, 3], [3, 5]]);
});

test('Case 3', function() {
  const value = combinationSum([2], 1);

  deepStrictEqual(value, []);
});