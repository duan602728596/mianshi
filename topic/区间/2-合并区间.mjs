import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 *
 * 示例 1：
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 * 示例 2：
 * 输入：intervals = [[1,4],[4,5]]
 * 输出：[[1,5]]
 * 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 */

/**
 * 判断是否重合
 * @param { [number, number] } a1
 * @param { [number, number] } a2
 * @return { boolean }
 */
function isMerged(a1, a2) {
  return !(a2[0] > a1[1] || a2[1] < a1[0]);
}

/**
 * 合并两个区间
 * @param { [number, number] } a1
 * @param { [number, number] } a2
 * @return { [number, number] | null }
 */
function mergeArray(a1, a2) {
  // 区间重合
  const left = Math.min(a1[0], a2[0]),
    right = Math.max(a1[1], a2[1]);

  return [left, right];
}

/**
 * @param { Array<[number, number]> } intervals
 * @return { Array<[number, number]> }
 */
function merge(intervals) {
  let i = 0;

  while (i < intervals.length) {
    let j = i + 1;
    let isModified = false; // 修改过

    while (j < intervals.length) {
      const m = isMerged(intervals[i], intervals[j]);

      if (m) {
        intervals[i] = mergeArray(intervals[i], intervals[j]);
        intervals.splice(j, 1);
        isModified = true;
      } else {
        j++;
      }
    }

    !isModified && i++;
  }

  return intervals;
}

test('Case 1', function() {
  deepStrictEqual(merge([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
});

test('Case 2', function() {
  deepStrictEqual(merge([[1, 4], [4, 5]]), [[1, 5]]);
});

test('Case 3', function() {
  deepStrictEqual(merge([[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]), [[1, 10]]);
});

test('Case 4', function() {
  deepStrictEqual(merge([[1, 4], [0, 2], [3, 5]]), [[0, 5]]);
});

test('Case 5', function() {
  deepStrictEqual(merge([[4, 5], [1, 4], [0, 1]]), [[0, 5]]);
});