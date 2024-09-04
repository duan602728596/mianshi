import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
 * 字母和数字都属于字母数字字符。
 * 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。
 */

/**
 * @param { string } s
 * @return { boolean }
 */
function isPalindrome(s) {
  const formatString = s.toLocaleLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  let result = true;

  for (let i = 0; i < formatString.length / 2; i++) {
    if (formatString[i] !== formatString.at(-1 - i)) {
      result = false;
      break;
    }
  }

  return result;
}

test('Case 1', function() {
  const str = 'A man, a plan, a canal: Panama';
  const result = isPalindrome(str);

  deepStrictEqual(result, true);
});

test('Case 2', function() {
  const str = 'race a car';
  const result = isPalindrome(str);

  deepStrictEqual(result, false);
});

test('Case 3', function() {
  const str = ' ';
  const result = isPalindrome(str);

  deepStrictEqual(result, true);
});