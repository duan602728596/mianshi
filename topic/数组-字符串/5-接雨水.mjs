import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * ⬜️⬜️⬜️⬜️⬜️⬜️⬜️⬛️⬜️⬜️⬜️⬜️
 * ⬜️⬜️⬜️⬛️🟦🟦🟦⬛️⬛️🟦⬛️⬜️
 * ⬜️⬛️🟦⬛️⬛️🟦⬛️⬛️⬛️⬛️⬛️⬛️
 *
 * 解题思路：
 * 找左右两边最大值中小者，减去本身高度
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

/**
 * 最佳参考答案：
 * class Solution {
 *     public int trap(int[] height) {
 *         int left = 0, right = height.length - 1;
 *         int maxL = height[left], maxR = height[right];
 *         int res = 0;
 *         while (left < right) {
 *             maxL = Math.max(maxL, height[left]);
 *             maxR = Math.max(maxR, height[right]);
 *             res += maxR > maxL ? maxL - height[left++] : maxR - height[right--];
 *         }
 *         return res;
 *     }
 * }
 *
 * @param { Array<number> } height
 * @return { number }
 */
function trap2(height) {
  let i = 0,
    j = height.length - 1,
    leftMax = height[i],
    rightMax = height[j],
    result = 0;

  while (i < j) {
    leftMax = Math.max(leftMax, height[i]);
    rightMax = Math.max(rightMax, height[j]);

    if (leftMax <= rightMax) {
      result += leftMax - height[i];
      i++;
    } else {
      result += rightMax - height[j];
      j--;
    }
  }

  return result;
}

test('Case 1: trap', function() {
  const a1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const result = trap(a1);

  deepStrictEqual(result, 6);
});

test('Case 2: trap', function() {
  const a1 = [4, 2, 0, 3, 2, 5];
  const result = trap(a1);

  deepStrictEqual(result, 9);
});

test('Case 3: trap', function() {
  const a1 = [4, 3, 3, 9, 3, 0, 9, 2, 8, 3];
  const result = trap(a1);

  deepStrictEqual(result, 23);
});

test('Case 4: trap2', function() {
  const a1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];
  const result = trap2(a1);

  deepStrictEqual(result, 6);
});

test('Case 5: trap2', function() {
  const a1 = [4, 2, 0, 3, 2, 5];
  const result = trap2(a1);

  deepStrictEqual(result, 9);
});

test('Case 6: trap2', function() {
  const a1 = [4, 3, 3, 9, 3, 0, 9, 2, 8, 3];
  const result = trap2(a1);

  deepStrictEqual(result, 23);
});