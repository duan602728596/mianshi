import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组是数组中的一个连续部分。
 *
 * int maxSubArray(vector<int>& nums) {
 *     int m = nums[0];
 *
 *     for(int i = 1; i < nums.size(); i++) {
 *         nums[i] = max(nums[i], nums[i] + nums[i-1]);
 *         m = max(m, nums[i]);
 *     }
 *
 *     return m;
 * }
 */

/**
 * @param { Array<number> } nums
 * @return {number}
 */
function maxSubArray(nums) {
  let maxResult = nums[0];

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      if (sum < nums[j]) break;

      maxResult = Math.max(maxResult, sum);
    }
  }

  return maxResult;
}

test('Case 1', function() {
  const a1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
  const k = maxSubArray(a1);

  deepStrictEqual(k, 6);
});

test('Case 2', function() {
  const a1 = [1];
  const k = maxSubArray(a1);

  deepStrictEqual(k, 1);
});

test('Case 3', function() {
  const a1 = [5, 4, -1, 7, 8];
  const k = maxSubArray(a1);

  deepStrictEqual(k, 23);
});

test('Case 4', function() {
  const a1 = [-1];
  const k = maxSubArray(a1);

  deepStrictEqual(k, -1);
});