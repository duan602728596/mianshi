import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。
 * 如果存在，返回 true ；否则，返回 false
 */

/**
 * @param { Array<number> } nums
 * @param { number } k
 * @return { boolean }
 */
function containsNearbyDuplicate(nums, k) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const key = String(nums[i]);

    if (key in map) {
      if (Math.abs(map[key] - i) <= k) {
        return true;
      } else {
        map[key] = i;
      }
    } else {
      map[key] = i;
    }
  }

  return false;
}

test('Case 1', function() {
  deepStrictEqual(containsNearbyDuplicate([1, 2, 3, 1], 3), true);
});

test('Case 2', function() {
  deepStrictEqual(containsNearbyDuplicate([1, 0, 1, 1], 1), true);
});

test('Case 3', function() {
  deepStrictEqual(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2), false);
});