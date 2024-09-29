import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 */

type PathItem = [number, number, number]; // [x坐标, y坐标, 路径的值]

function minPathSum(grid: Array<number[]>): number {
  // 记录每一步的状态
  const arr: Array<PathItem[]> = [
    [[0, 0, grid[0][0]]]
  ];
  // 缓存坐标对应的最小值
  const cache: Record<string, number> = {
    '0,0': grid[0][0]
  };
  const [m, n]: [number, number] = [grid.length, grid[0].length];
  let result: number | null = null;

  // 循环缓存数组
  for (let j: number = 0; j < arr.length; j++) {
    const newArr: Array<PathItem> = [];

    // 循环数组内的每个状态
    for (let i: number = 0; i < arr[j].length; i++) {
      const [x, y, value]: PathItem = arr[j][i];

      if (x === n - 1 && y === m - 1) {
        result ??= value;
        result = Math.min(result, value);
        continue;
      }

      // 向右
      if (x + 1 < n) {
        const [nextX, nextY, nextValue]: PathItem = [x + 1, y, value + grid[y][x + 1]];
        const key: string = `${ nextX },${ nextY }`;

        if (cache[key]) {
          if (cache[key] > nextValue) {
            cache[key] = nextValue;
            newArr.push([nextX, nextY, nextValue]);
          }
        } else {
          cache[key] = nextValue;
          newArr.push([nextX, nextY, nextValue]);
        }
      }

      // 向下
      if (y + 1 < m) {
        const [nextX, nextY, nextValue]: PathItem = [x, y + 1, value + grid[y + 1][x]];
        const key: string = `${ nextX },${ nextY }`;

        if (cache[key]) {
          if (cache[key] > nextValue) {
            cache[key] = nextValue;
            newArr.push([nextX, nextY, nextValue]);
          }
        } else {
          cache[key] = nextValue;
          newArr.push([nextX, nextY, nextValue]);
        }
      }
    }

    newArr.length > 0 && arr.push(newArr);
  }

  return result!;
}

test('Case 1', function(): void {
  deepStrictEqual(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]), 7);
});

test('Case 2', function(): void {
  deepStrictEqual(minPathSum([[1, 2, 3], [4, 5, 6]]), 12);
});