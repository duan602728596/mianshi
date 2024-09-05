import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 */

/**
 * @param { Array<number> } digits
 * @return { Array<number> }
 */
function plusOne(digits) {
  let [a, b] = [0, 1];

  for (let i = digits.length - 1; i >= 0; i--) {
    const newValue = digits[i] + b;

    [a, b] = [newValue % 10, Math.floor(newValue / 10)];
    digits[i] = a;
  }

  if (b > 0) {
    digits.unshift(b);
  }

  return digits;
}

test('Case 1', function() {
  deepStrictEqual(plusOne([1, 2, 3]), [1, 2, 4]);
});

test('Case 2', function() {
  deepStrictEqual(plusOne([4, 3, 2, 1]), [4, 3, 2, 2]);
});

test('Case 3', function() {
  deepStrictEqual(plusOne([0]), [1]);
});