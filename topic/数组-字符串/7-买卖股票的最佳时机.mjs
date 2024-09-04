import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

/**
 * @param { Array<number> } prices
 * @return { number }
 */
function maxProfit(prices) {
  let min = null;
  let max = null;
  let result = 0;

  for (let i = 0; i < prices.length; i++) {
    if (min === null) {
      // 找到最小值
      min = prices[i];
    } if (max === null && prices[i] > min) {
      // 找到最大值
      max = prices[i];
    } else if (max !== null && prices[i] > max) {
      // 找到更大的值
      max = prices[i];
    } else if (min !== null && prices[i] < min) {
      // 找到下一个最小值
      const c = max - min; // 记录当前的值

      result = c > result ? c : result;

      // 重置
      min = prices[i];
      max = null;
    }
  }

  if (max !== null) {
    const c = max - min; // 记录当前的值

    result = c > result ? c : result;
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 5);
});

test('Case 2', function() {
  deepStrictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});

test('Case 3', function() {
  deepStrictEqual(maxProfit([2, 4, 1]), 2);
});

test('Case 4', function() {
  deepStrictEqual(maxProfit([1, 2]), 1);
});

test('Case 5', function() {
  deepStrictEqual(maxProfit([1, 2, 4]), 3);
});

test('Case 6', function() {
  deepStrictEqual(maxProfit([3, 2, 6, 5, 0, 3]), 4);
});