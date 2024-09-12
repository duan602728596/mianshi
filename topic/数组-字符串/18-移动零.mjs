import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 */

/**
 * @param { Array<number> } nums
 * @return { void } Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums) {
  let i = 0,
    j = i + 1;

  while (i < nums.length && j < nums.length) {
    if (nums[i] !== 0) {
      i++;

      if (j <= i) j = i + 1;

      continue;
    }

    while (i < nums.length && j < nums.length) {
      if (nums[j] !== 0) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        j++;
        break;
      } else {
        j++;
      }
    }

    i++;

    if (j <= i) j = i + 1;
  }
}

test('Case 1', function() {
  const nums = [0, 1, 0, 3, 12];

  moveZeroes(nums);
  deepStrictEqual(nums, [1, 3, 12, 0, 0]);
});

test('Case 2', function() {
  const nums = [0];

  moveZeroes(nums);
  deepStrictEqual(nums, [0]);
});

test('Case 3', function() {
  const nums = [1, 0];

  moveZeroes(nums);
  deepStrictEqual(nums, [1, 0]);
});