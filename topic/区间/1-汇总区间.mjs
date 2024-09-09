import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个  无重复元素 的 有序 整数数组 nums 。
 * 返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表 。也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。
 * 列表中的每个区间范围 [a,b] 应该按如下格式输出：
 *
 * "a->b" ，如果 a != b
 * "a" ，如果 a == b
 */

/**
 * @param { Array<number> } nums
 * @return { Array<string> }
 */
function summaryRanges(nums) {
  const result = [];
  let cache = [];

  for (let i = 0; i < nums.length; i++) {
    if (cache.length === 0) {
      cache.push(nums[i]);
    } else {
      if (nums[i] === cache.at(-1) + 1) {
        cache.length === 2 && cache.pop();
        cache.push(nums[i]);
      } else {
        result.push(cache.join('->'));
        cache = [nums[i]];
      }
    }
  }

  if (cache.length > 0) {
    result.push(cache.join('->'));
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(summaryRanges([0, 1, 2, 4, 5, 7]), ['0->2', '4->5', '7']);
});

test('Case 2', function() {
  deepStrictEqual(summaryRanges([0, 2, 3, 4, 6, 8, 9]), ['0', '2->4', '6', '8->9']);
});