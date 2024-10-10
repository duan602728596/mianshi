import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个 m x n 的整数数组 grid。一个机器人初始位于 左上角（即 grid[0][0]）。机器人尝试移动到 右下角（即 grid[m - 1][n - 1]）。机器人每次只能向下或者向右移动一步。
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。机器人的移动路径中不能包含 任何 有障碍物的方格。
 * 返回机器人能够到达右下角的不同路径数量。
 * 测试用例保证答案小于等于 2 * 109。
 */

/**
 * @param { Array<number[]> } obstacleGrid - 竖排
 */
function uniquePathsWithObstacles(obstacleGrid: Array<number[]>): number {
  if (obstacleGrid[0][0] === 1) return 0;

  if (obstacleGrid.at(-1)!.at(-1)! === 1) return 0;

  const [m, n]: [number, number] = [obstacleGrid.length, obstacleGrid[0].length];
  const arr: Array<number> = [];

  for (let y: number = 0; y < m; y++) {
    for (let x: number = 0; x < n; x++) {
      const item: number = obstacleGrid[y][x];

      // 有障碍，无法计算
      if (item === 1) {
        arr[x] = 0;
        continue;
      }

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
  deepStrictEqual(uniquePathsWithObstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]]), 2);
});

test('Case 2', function(): void {
  deepStrictEqual(uniquePathsWithObstacles([[0, 1], [0, 0]]), 1);
});