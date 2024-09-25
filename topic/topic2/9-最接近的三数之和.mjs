import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
 * 返回这三个数的和。
 * 假定每组输入只存在恰好一个解。
 */

/**
 * @param { Array<number> } nums
 * @param { number } target
 * @return {number}
 */
function threeSumClosest(nums, target) {
  let result = null;
  let sumNumberResult = null;

  /**
   * @param { Array<number> } numsArray - 下一个可以用到的数组
   * @param { number } sumNumber - 总和
   * @param { number } index - 索引
   */
  function search(numsArray, sumNumber, index) {
    // 找到最合适的解
    if (index === 4) {
      const v = target > sumNumber ? target - sumNumber : sumNumber - target;

      if (result === null) {
        result = v;
        sumNumberResult = sumNumber;
      } else {
        if (result > v) {
          result = v;
          sumNumberResult = sumNumber;
        }
      }

      return;
    }

    // 搜索
    for (let i = 0; i < numsArray.length; i++) {
      const newNumsArray = [...numsArray];

      newNumsArray.splice(i, 1);
      search(newNumsArray, sumNumber + numsArray[i], index + 1);
    }
  }

  for (let i = 0; i <= nums.length - 3; i++) {
    const newArray = [...nums];

    newArray.splice(i, 1);
    search(newArray, nums[i], 2);
  }

  return sumNumberResult;
}

test('Case 1', function() {
  deepStrictEqual(threeSumClosest([-1, 2, 1, -4], 1), 2);
});

test('Case 2', function() {
  deepStrictEqual(threeSumClosest([0, 0, 0], 1), 0);
});