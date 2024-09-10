import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""。
 */

/**
 * @param { Array<string> } strs
 * @return { string }
 */
function longestCommonPrefix(strs) {
  if (strs.length === 1) return strs[0];

  const pre = [];

  for (let i = 1; i <= strs[0].length; i++) {
    pre.push(strs[0].substring(0, i));
  }

  let result = '';

  for (let i = 1; i < strs.length; i++) {
    const r = pre.findLast((p) => strs[i].startsWith(p));

    if (r) {
      if (result === '') {
        result = r;
      } else {
        result = r.length > result.length ? result : r;
      }
    } else {
      return '';
    }
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(longestCommonPrefix(['flower', 'flow', 'flight']), 'fl');
});

test('Case 2', function() {
  deepStrictEqual(longestCommonPrefix(['dog', 'racecar', 'car']), '');
});

test('Case 3', function() {
  deepStrictEqual(longestCommonPrefix(['a']), 'a');
});

test('Case 4', function() {
  deepStrictEqual(longestCommonPrefix(['aaa', 'aa', 'aaa']), 'aa');
});