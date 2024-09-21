import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 */

/**
 * @param { Array<number> } nums
 * @return { number }
 */
function rob(nums) {
  if (nums.length < 3) return Math.max(...nums);

  const cache = {};

  /**
   * 搜索
   * @param { number } index - 开始搜索的索引
   * @return { number }
   */
  function getMoney(index) {
    // 最后一个数字，返回钱
    if (index + 2 >= nums.length) return nums[index];

    if (cache[`${ index }`] !== undefined) return cache[`${ index }`];

    let max = 0;

    for (let i = index + 2; i < nums.length; i++) {
      const m = getMoney(i); // 返回最大的钱

      max = Math.max(max, m + nums[index]);
    }

    cache[`${ index }`] = max;

    return max;
  }

  let returnMax = 0;

  for (let i = 0; i < 2; i++) {
    returnMax = Math.max(returnMax, getMoney(i));
  }

  return returnMax;
}

test('Case 1', function() {
  deepStrictEqual(rob([1, 2, 3, 1]), 4);
});

test('Case 2', function() {
  deepStrictEqual(rob([2, 7, 9, 3, 1]), 12);
});

test('Case 3', function() {
  deepStrictEqual(rob([1, 2]), 2);
});

test('Case 4', function() {
  deepStrictEqual(rob([1, 3, 1]), 3);
});