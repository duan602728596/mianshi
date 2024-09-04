import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬛️⬜️⬜️⬜️⬜️
 * ⬜️⬜️⬜️⬛️🟦🟦🟦⬛️⬛️🟦⬛️⬜️
 * ⬜️⬛️🟦⬛️⬛️🟦⬛️⬛️⬛️⬛️⬛️⬛️
 */

/**
 * 计算接雨水的总量
 * @param { Array<number> } height
 * @param { number } leftIndex
 * @param { number } rightIndex
 */
function getRainWater(height, leftIndex, rightIndex) {
  const min = Math.min(height[leftIndex], height[rightIndex]);
  let all = 0;

  for (let i = leftIndex + 1; i < rightIndex; i++) {
    all += min - height[i];
  }

  return all;
}

/**
 * @param { Array<number> } height
 * @return { number }
 */
function trap(height) {
  let rightIndex = null;
  let max = null;
  let all = 0; // 雨水

  for (let leftIndex = 0; leftIndex <= height.length - 3;) {
    const left = height[leftIndex];

    rightIndex = null;

    // 左侧为0，不可能接雨水
    if (left <= height[leftIndex + 1]) {
      leftIndex++;
      continue;
    }

    // 接雨水需要的右侧的高度要比容器内最大的高度要大
    max = height[leftIndex + 1];

    for (let j = leftIndex + 2; j < height.length; j++) {
      if (left > height[j] && height[rightIndex] > height[j]) {
        continue;
      }

      if (height[j] > max) {
        // 比右侧最高的还要高
        if (rightIndex !== null && height[j] > height[rightIndex]) {
          max = max >= height[rightIndex] ? max : height[rightIndex];
        }

        // 找到右侧最大的高度，可以接雨水
        rightIndex = j;

        // 右侧比左侧高就不找了
        if (height[j] >= left) {
          break;
        }
      } else {
        max = max >= height[j] ? max : height[j];
      }
    }

    // 计算雨水
    if (rightIndex !== null) {
      all += getRainWater(height, leftIndex, rightIndex);
      leftIndex = rightIndex;
    } else {
      leftIndex++;
    }
  }

  return all;
}

test('Case 1', function() {
  const a1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const result = trap(a1);

  deepStrictEqual(result, 6);
});

test('Case 2', function() {
  const a1 = [4, 2, 0, 3, 2, 5];
  const result = trap(a1);

  deepStrictEqual(result, 9);
});

test('Case 3', function() {
  const a1 = [4, 3, 3, 9, 3, 0, 9, 2, 8, 3];
  const result = trap(a1);

  deepStrictEqual(result, 23);
});