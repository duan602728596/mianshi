import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。
 * 如果气温在这之后都不会升高，请在该位置用 0 来代替。
 */

/**
 * @param { Array<number> } temperatures
 * @return { Array<number> }
 */
function dailyTemperatures(temperatures) {
  const cache = [temperatures[0]],
    indexCache = [0],
    result = [0];

  /* 判断cache里面的问题 */
  function temperaturesInCache(item, index) {
    let i = 0;

    while (i < cache.length) {
      if (item - cache[i] > 0) {
        result[indexCache[i]] = index - indexCache[i];
        cache.splice(i, 1);
        indexCache.splice(i, 1);
      } else {
        i++;
      }
    }
  }

  for (let i = 1; i < temperatures.length; i++) {
    const item = temperatures[i];

    result[i] = 0;
    temperaturesInCache(item, i);
    cache.push(item);
    indexCache.push(i);
  }

  return result;
}

test('Case 1', function() {
  const result = dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);

  deepStrictEqual(result, [1, 1, 4, 2, 1, 1, 0, 0]);
});

test('Case 2', function() {
  const result = dailyTemperatures([30, 40, 50, 60]);

  deepStrictEqual(result, [1, 1, 1, 0]);
});

test('Case 3', function() {
  const result = dailyTemperatures([30, 60, 90]);

  deepStrictEqual(result, [1, 1, 0]);
});