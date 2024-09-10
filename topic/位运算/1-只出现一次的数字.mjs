import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 */

/**
 * @param { Array<number> } nums
 * @return { number }
 */
function singleNumber(nums) {
  for (let i = 1; i < nums.length; i++) {
    nums[0] ^= nums[i];
  }

  return nums[0];
}

test('Case 1', function() {
  deepStrictEqual(singleNumber([2, 2, 1]), 1);
});

test('Case 2', function() {
  deepStrictEqual(singleNumber([4, 1, 2, 1, 2]), 4);
});

test('Case 3', function() {
  deepStrictEqual(singleNumber([1]), 1);
});