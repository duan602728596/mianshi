import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 峰值元素是指其值严格大于左右相邻值的元素。
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
 * 你可以假设 nums[-1] = nums[n] = -∞ 。
 * 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。
 */

/**
 * @param { Array<number> } nums
 * @return { number }
 */
function findPeakElement(nums) {
  let result = null;

  function search(left, right) {
    if (left > right || result !== null) return;

    if (left === right && (left - 1 < 0 || nums[left - 1] < nums[left]) && ((left + 1) > (nums.length - 1) || nums[left + 1] < nums[left])) result ??= left;

    const middle = Math.floor((right - left) / 2) + left;

    if (nums[middle - 1] < nums[middle] && nums[middle + 1] < nums[middle]) {
      result ??= middle;

      return;
    }

    search(left, middle - 1);
    search(middle + 1, right);
  }

  search(0, nums.length - 1);

  return result;
}

test('Case 1', function() {
  deepStrictEqual(findPeakElement([1, 2, 3, 1]), 2);
});

test('Case 2', function() {
  deepStrictEqual(findPeakElement([1, 2, 1, 3, 5, 6, 4]), 1); // 1 or 5
});