import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 *
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 *
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释:
 * 向右轮转 1 步: [99,-1,-100,3]
 * 向右轮转 2 步: [3,99,-1,-100]
 */

/**
 * @param { Array<number> } nums
 * @param { number } k
 * @return { void } Do not return anything, modify nums in-place instead.
 */
function rotate(nums, k) {
  const i = k % nums.length;

  nums.unshift(...nums.splice(nums.length - i, i));
}

test('Case 1', function() {
  const a1 = [1, 2, 3, 4, 5, 6, 7];

  rotate(a1, 3);
  deepStrictEqual(a1, [5, 6, 7, 1, 2, 3, 4]);
});

test('Case 2', function() {
  const a1 = [-1, -100, 3, 99];

  rotate(a1, 2);
  deepStrictEqual(a1, [3, 99, -1, -100]);
});