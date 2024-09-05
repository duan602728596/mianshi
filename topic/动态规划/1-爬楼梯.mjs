import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

/**
 * @param { number } n
 * @return { number }
 */
function climbStairs(n) {
  if (n < 2) {
    return 1;
  }

  const arr = [1, 1];

  for (let i = 2; i < n + 1; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr[n];
}

test('Case 1', function() {
  deepStrictEqual(climbStairs(2), 2);
});

test('Case 2', function() {
  deepStrictEqual(climbStairs(3), 3);
});