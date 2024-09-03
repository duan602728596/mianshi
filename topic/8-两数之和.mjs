import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 *
 * 你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。
 *
 * 你可以按任意顺序返回答案。
 */

/**
 * @param { Array<number> } nums
 * @param { number } target
 * @return { Array<number> }
 */
function twoSum(nums, target) {
  let i = 0;
  let j = i + 1;
  let result = null;

  while (i <= nums.length - 1 && result === null) {
    while (j <= nums.length && result === null) {
      if (nums[i] + nums[j] === target) {
        result = [i, j];
      } else {
        j++;
      }
    }

    i++;
    j = i + 1;
  }

  return result;
}

test('Case 1', function() {
  const k = twoSum([2, 7, 11, 15], 9);

  deepStrictEqual(k, [0, 1]);
});

test('Case 2', function() {
  const k = twoSum([3, 2, 4], 6);

  deepStrictEqual(k, [1, 2]);
});

test('Case 3', function() {
  const k = twoSum([3, 3], 6);

  deepStrictEqual(k, [0, 1]);
});