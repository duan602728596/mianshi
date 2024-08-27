import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
 * 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
 *
 *   - 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
 *   - 返回 k 。
 */

/**
 * @param { Array<number> } nums
 * @return { number }
 */
function removeDuplicates(nums) {
  const length = nums.length;
  let k = 1;

  let i = 0;
  let n = i + 2;

  while (i <= length) {
    if (typeof nums[i + 1] === 'number' && nums[i] >= nums[i + 1]) {
      // 找到下一个大于k的
      while (n <= length) {
        if (nums[n] > nums[i + 1] && nums[n] > nums[i]) {
          [nums[i + 1], nums[n]] = [nums[n], nums[i + 1]];
          break;
        }

        n++;
      }
    }

    if (i > 0) {
      if (nums[i] > nums[i - 1]) {
        // 正常情况下，前一个元素应该小于当前元素，数量+1
        k++;
      } else {
        // 没有置换的情况下，需要停止计算
        break;
      }
    }

    i++;
  }

  return k;
}

test('Case 1', function() {
  const a1 = [1, 1, 2];
  const k = removeDuplicates(a1);

  deepStrictEqual(a1.slice(0, 2), [1, 2]);
  deepStrictEqual(k, 2);
});

test('Case 2', function() {
  const a1 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
  const k = removeDuplicates(a1);

  deepStrictEqual(a1.slice(0, 5), [0, 1, 2, 3, 4]);
  deepStrictEqual(k, 5);
});

test('Case 3', function() {
  const a1 = [1, 2];
  const k = removeDuplicates(a1);

  deepStrictEqual(a1.slice(0, 2), [1, 2]);
  deepStrictEqual(k, 2);
});