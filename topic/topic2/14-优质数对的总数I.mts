import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你两个整数数组 nums1 和 nums2，长度分别为 n 和 m。同时给你一个正整数 k。
 * 如果 nums1[i] 可以被 nums2[j] * k 整除，则称数对 (i, j) 为 优质数对（0 <= i <= n - 1, 0 <= j <= m - 1）。
 * 返回 优质数对 的总数。
 */

/**
 * 判断是否可以整除
 * @param { number } m
 * @param { number } n
 * @return { boolean }
 */
function canDivisibility(m: number, n: number): boolean {
  return m % n === 0;
}

function numberOfPairs(nums1: Array<number>, nums2: Array<number>, k: number): number {
  let result: number = 0;

  for (let i: number = 0; i < nums1.length; i++) {
    for (let j: number = 0; j < nums2.length; j++) {
      if (canDivisibility(nums1[i], nums2[j] * k)) {
        result++;
      }
    }
  }

  return result;
}

test('Case 1', function(): void {
  deepStrictEqual(numberOfPairs([1, 3, 4], [1, 3, 4], 1), 5);
});

test('Case 2', function(): void {
  deepStrictEqual(numberOfPairs([1, 2, 4, 12], [2, 4], 3), 2);
});