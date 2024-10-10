import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
 * 问总共有多少条不同的路径？
 */

/**
 * @param { number } m - 竖排
 * @param { number } n - 横排
 */
function uniquePaths(m: number, n: number): number {
  const arr: Array<number> = [];

  for (let y: number = 0; y < m; y++) {
    for (let x: number = 0; x < n; x++) {
      if (x === 0 && y === 0) {
        arr[x] = 1;
      } else {
        const left: number = arr[x - 1] ?? 0;
        const top: number = arr[x] ?? 0;

        arr[x] = left + top;
      }
    }
  }

  return arr.at(-1)!;
}

test('Case 1', function(): void {
  deepStrictEqual(uniquePaths(3, 7), 28);
});

test('Case 2', function(): void {
  deepStrictEqual(uniquePaths(3, 2), 3);
});

test('Case 3', function(): void {
  deepStrictEqual(uniquePaths(7, 3), 28);
});

test('Case 4', function(): void {
  deepStrictEqual(uniquePaths(3, 3), 6);
});