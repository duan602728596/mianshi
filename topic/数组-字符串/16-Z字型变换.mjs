import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 *
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 */

/**
 * @param { string } s
 * @param { number } numRows
 * @return { string }
 */
function convert(s, numRows) {
  if (numRows === 1) return s;

  const result = [];

  for (let i = 0, j = 0, k = 1, m = numRows - 1; i < s.length; i++, j += k) {
    if (j === 0) {
      k = 1;
    } else if (j === m) {
      k = -1;
    }

    result[j] ??= '';
    result[j] += s[i];
  }

  return result.join('');
}

test('Case 1', function() {
  deepStrictEqual(convert('PAYPALISHIRING', 3), 'PAHNAPLSIIGYIR');
});

test('Case 2', function() {
  deepStrictEqual(convert('PAYPALISHIRING', 4), 'PINALSIGYAHRPI');
});

test('Case 3', function() {
  deepStrictEqual(convert('AB', 1), 'AB');
});