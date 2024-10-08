import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
 * 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
 *
 * 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，
 *      其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
 */

/**
 * @param { Array<number> } nums1
 * @param { number } m
 * @param { Array<number> } nums2
 * @param { number } n
 * @return { void } Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
  const nums1Length = m + n;
  let i = 0;
  let j = 0;
  let k = m;

  while (i < nums1Length && j < n) {
    const num1Item = nums1[i];
    const num2Item = nums2[j];

    if (num2Item >= num1Item && i < k) {
      i++;
    } else {
      nums1.splice(i, 0, num2Item);
      nums1.pop();
      j++;
      k++;
    }
  }
}

test('Case 1', function() {
  const a1 = [1, 2, 3, 0, 0, 0];
  const a2 = [2, 5, 6];

  merge(a1, 3, a2, 3);
  deepStrictEqual(a1, [1, 2, 2, 3, 5, 6]);
});

test('Case 2', function() {
  const a1 = [1];
  const a2 = [];

  merge(a1, 1, a2, 0);
  deepStrictEqual(a1, [1]);
});

test('Case 3', function() {
  const a1 = [0];
  const a2 = [1];

  merge(a1, 0, a2, 1);
  deepStrictEqual(a1, [1]);
});

test('Case 4', function() {
  const a1 = [-1, 0, 0, 3, 3, 3, 0, 0, 0];
  const a2 = [1, 2, 2];

  merge(a1, 6, a2, 3);
  deepStrictEqual(a1, [-1, 0, 0, 1, 2, 2, 3, 3, 3]);
});