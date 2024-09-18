import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个满足下述两条属性的 m x n 整数矩阵：
 *
 * 每行中的整数从左到右按非严格递增顺序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 * 给你一个整数 target ，如果 target 在矩阵中，返回 true ；否则，返回 false 。
 */

/**
 * @param { Array<number[]> } matrix
 * @param { number } target
 * @return { boolean }
 */
function searchMatrix(matrix, target) {
  let result = false;

  function search(row, left, right) {
    if (left > right) return;

    if (left === right && row[left] === target) result = true;

    const middle = Math.floor((right - left) / 2) + left;

    if (row[middle] === target) {
      result = true;

      return;
    }

    if (row[middle] > target) {
      search(row, left, middle - 1);
    } else if (row[middle] < target) {
      search(row, middle + 1, right);
    }
  }

  for (const row of matrix) {
    if (target >= row[0] && target <= row.at(-1)) {
      search(row, 0, row.length - 1); // 判断当前行是否包含target

      if (result) return result;
    }
  }

  return result;
}

test('Case 1', function() {
  const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
  ];
  const target = 3;

  deepStrictEqual(searchMatrix(matrix, target), true);
});

test('Case 2', function() {
  const matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60]
  ];
  const target = 13;

  deepStrictEqual(searchMatrix(matrix, target), false);
});