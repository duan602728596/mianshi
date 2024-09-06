import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个整数数组 nums，请你将该数组升序排列。
 */

/**
 * @param { Array<number> } nums
 * @return { Array<number> }
 */
function sortArray(nums) {
  /**
   * 排序
   * @param { number } left
   * @param { number } right
   */
  function sort(left, right) {
    if (left >= right) return;

    let pointIndex = left;
    let l = left + 1;

    while (l <= right) {
      if (nums[l] < nums[pointIndex]) {
        nums.splice(pointIndex++, 0, ...nums.splice(l, 1));
      }

      l++;
    }

    sort(left, pointIndex - 1);
    sort(pointIndex + 1, right);
  }

  sort(0, nums.length - 1);

  return nums;
}

test('Case 1', function() {
  deepStrictEqual(sortArray([5, 2, 3, 1]), [1, 2, 3, 5]);
});

test('Case 2', function() {
  deepStrictEqual(sortArray([5, 1, 1, 2, 0, 0]), [0, 0, 1, 1, 2, 5]);
});

test('Case 3', function() {
  const arr = [15123, 31873, 222, 2, 58, 13_000, 5_669, 32];
  const arr2 = [...arr];

  arr2.sort((a, b) => a - b);

  deepStrictEqual(sortArray(arr), arr2);
});