import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 返回 你能获得的 最大 利润 。
 */

/**
 * @param { Array<number> } prices
 * @return { number }
 */
function maxProfit(prices) {
  let min = null,
    max = null,
    result = 0;

  for (let i = 0; i < prices.length; i++) {
    const item = prices[i];

    // 找到min
    if (min === null) {
      min = item;
      continue;
    }

    if (max === null) {
      if (item > min) {
        max = item;
      } else {
        min = item;
      }

      continue;
    }

    if (item > max) {
      max = item;
    } else {
      // 计算上一个区间
      result += max - min;
      min = item;
      max = null;
    }
  }

  if (min !== null && max !== null) {
    result += max - min;
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(maxProfit([7, 1, 5, 3, 6, 4]), 7);
});

test('Case 2', function() {
  deepStrictEqual(maxProfit([1, 2, 3, 4, 5]), 4);
});

test('Case 3', function() {
  deepStrictEqual(maxProfit([7, 6, 4, 3, 1]), 0);
});