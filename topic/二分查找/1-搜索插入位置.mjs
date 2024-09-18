import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 请必须使用时间复杂度为 O(log n) 的算法。
 */

/**
 * @param { Array<number> } nums
 * @param { number } target
 * @return { number }
 */
function searchInsert(nums, target) {
  if (target <= nums[0]) return 0;

  if (target > nums.at(-1)) return nums.length;

  let insertIndex = null;

  /**
   * 给insertIndex设置值
   * @param { number } index
   */
  function setInsertIndexValue(index) {
    if (insertIndex === null) {
      insertIndex = index;
    } else {
      insertIndex = Math.min(insertIndex, index);
    }
  }

  /**
   * 搜索
   * @param { number } left
   * @param { number } right
   */
  function search(left, right) {
    if (left > right) return;

    if (left === right) {
      const t1 = nums[left];

      if (t1 >= target) setInsertIndexValue(left);

      return;
    }

    const middleIndex = Math.floor((right - left) / 2) + left;
    const t2 = nums[middleIndex];

    if (target > t2) {
      search(middleIndex + 1, right);
    } else {
      setInsertIndexValue(middleIndex);
      search(left, middleIndex - 1);
    }
  }

  search(0, nums.length - 1);

  return insertIndex;
}

test('Case 1', function() {
  const nums = [1, 3, 5, 6];
  const target = 5;
  const index = searchInsert(nums, target);

  deepStrictEqual(index, 2);
});

test('Case 2', function() {
  const nums = [1, 3, 5, 6];
  const target = 2;
  const index = searchInsert(nums, target);

  deepStrictEqual(index, 1);
});

test('Case 3', function() {
  const nums = [1, 3, 5, 6];
  const target = 7;
  const index = searchInsert(nums, target);

  deepStrictEqual(index, 4);
});