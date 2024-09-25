import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
 * 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
 * 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，那么数组的
 * 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
 *
 * 例如，arr = [1,2,3] 的下一个排列是 [1,3,2] 。
 * 类似地，arr = [2,3,1] 的下一个排列是 [3,1,2] 。
 * 而 arr = [3,2,1] 的下一个排列是 [1,2,3] ，因为 [3,2,1] 不存在一个字典序更大的排列。
 * 给你一个整数数组 nums ，找出 nums 的下一个排列。
 *
 * 必须 原地 修改，只允许使用额外常数空间。
 *
 * 从后往前找出数值下降的位置 i
 * 交换 nums[i] 和 i之后比nums[i]大的最小数
 * 让i+1位及其之后的排列最小即 递增（其实已经是递减的了，直接反转就行）
 */

/**
 * @param { Array<number> } nums
 * @return { void } Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums) {
  let index = -1;
  let t = nums.at(-1);

  // 找递增的index
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] > t) {
      t = nums[i];
    } else if (nums[i] < t) {
      index = i;
      break;
    }
  }

  // 从index后面找到最小的作为交换
  if (index >= 0) {
    let minIndex = -1;

    for (let i = nums.length - 1; i >= index + 1; i--) {
      if (nums[i] <= nums[index]) continue;

      if (minIndex <= 0) {
        minIndex = i;
        continue;
      }

      if (nums[i] < nums[minIndex]) {
        minIndex = i;
      }
    }

    if (minIndex >= 0) [nums[index], nums[minIndex]] = [nums[minIndex], nums[index]]; // 交换
  }

  // 反转数组
  let reverseLeft = index + 1,
    reverseRight = nums.length - 1;

  while (reverseLeft < reverseRight) {
    [nums[reverseLeft], nums[reverseRight]] = [nums[reverseRight], nums[reverseLeft]];
    reverseLeft++;
    reverseRight--;
  }
}

test('Case 1', function() {
  const arr = [1, 2, 3];

  nextPermutation(arr);
  deepStrictEqual(arr, [1, 3, 2]);
});

test('Case 2', function() {
  const arr = [3, 2, 1];

  nextPermutation(arr);
  deepStrictEqual(arr, [1, 2, 3]);
});

test('Case 3', function() {
  const arr = [1, 1, 5];

  nextPermutation(arr);
  deepStrictEqual(arr, [1, 5, 1]);
});

test('Case 4', function() {
  const arr = [2, 5, 3, 4, 6, 1];

  nextPermutation(arr);
  deepStrictEqual(arr, [2, 5, 3, 6, 1, 4]);
});

test('Case 5', function() {
  const arr = [4, 2, 0, 2, 3, 2, 0];

  nextPermutation(arr);
  deepStrictEqual(arr, [4, 2, 0, 3, 0, 2, 2]);
});

test('Case 6', function() {
  const arr = [2, 2, 0, 4, 3, 1];

  nextPermutation(arr);
  deepStrictEqual(arr, [2, 2, 1, 0, 3, 4]);
});

test('Case 7', function() {
  const arr = [0, 0, 4, 2, 1, 0];

  nextPermutation(arr);
  deepStrictEqual(arr, [0, 1, 0, 0, 2, 4]);
});

test('Case 8', function() {
  const arr = [1, 3, 2];

  nextPermutation(arr);
  deepStrictEqual(arr, [2, 1, 3]);
});

test('Case 9', function() {
  const arr = [1, 7, 8, 5, 7, 4, 1, 8, 5, 9, 7, 5];

  nextPermutation(arr);
  deepStrictEqual(arr, [1, 7, 8, 5, 7, 4, 1, 8, 7, 5, 5, 9]);
});

test('Case 10', function() {
  const arr = [2, 3, 1, 3, 3];

  nextPermutation(arr);
  deepStrictEqual(arr, [2, 3, 3, 1, 3]);
});