import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。
 * 假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行以下操作：
 *   - 更改 nums 数组，使 nums 的前 k 个元素包含不等于 val 的元素。nums 的其余元素和 nums 的大小并不重要。
 *   - 返回 k。
 */

/**
 * @param { Array<number> } nums
 * @param { number } val
 * @return { number }
 */
function removeElement(nums, val) {
  let end = nums.length - 1;
  let i = 0;
  let k = 0;

  while (i <= end) {
    const item = nums[i];

    if (item === val) {
      nums.splice(i, 1);
      nums.push('_');
      end--;
      k++;
    } else {
      i++;
    }
  }

  return k;
}

test('Case 1', function() {
  const a1 = [3, 2, 2, 3];
  const k = removeElement(a1, 3);

  deepStrictEqual(a1, [2, 2, '_', '_']);
  deepStrictEqual(k, 2);
});

test('Case 2', function() {
  const a1 = [0, 1, 2, 2, 3, 0, 4, 2];
  const k = removeElement(a1, 2);

  deepStrictEqual(a1, [0, 1, 3, 0, 4, '_', '_', '_']);
  deepStrictEqual(k, 3);
});