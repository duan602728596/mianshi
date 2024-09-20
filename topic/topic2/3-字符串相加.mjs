import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * 你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。
 */

/**
 * @param { string } num1
 * @param { string } num2
 * @return { string }
 */
function addStrings(num1, num2) {
  const num1Array = num1.split('').reverse();
  const num2Array = num2.split('').reverse();
  const length = Math.max(num1Array.length, num2Array.length);
  const result = [];
  let nextAdd = 0;

  for (let i = 0; i < length; i++) {
    const [n1, n2] = [
      num1Array[i] ? parseInt(num1Array[i]) : 0,
      num2Array[i] ? parseInt(num2Array[i]) : 0
    ];
    const v = n1 + n2 + nextAdd;

    result.unshift(v % 10);
    nextAdd = Math.floor(v / 10);
  }

  if (nextAdd > 0) result.unshift(nextAdd);

  return result.join('');
}

test('Case 1', function() {
  deepStrictEqual(addStrings('11', '123'), '134');
});

test('Case 2', function() {
  deepStrictEqual(addStrings('456', '77'), '533');
});