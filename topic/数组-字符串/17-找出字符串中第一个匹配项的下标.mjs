import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串的第一个匹配项的下标（下标从 0 开始）。
 * 如果 needle 不是 haystack 的一部分，则返回  -1 。
 */

/**
 * @param { string } haystack
 * @param { string}  needle
 * @return { number }
 */
function strStr(haystack, needle) {
  const cache = [],
    needleLength = needle.length;
  let index = -1;

  for (let i = 0; i < haystack.length; i++) {
    cache.unshift(haystack[i]);

    if (haystack[i] === needle) {
      index = i;
      break;
    }

    let j = 1;

    while (j < cache.length) {
      cache[j] += haystack[i];

      if (cache[j] === needle) {
        index = i - j;
        break;
      }

      if (cache[j].length === needleLength) {
        cache.pop();
      } else {
        j++;
      }
    }

    if (index !== -1) break;
  }

  return index;
}

test('Case 1', function() {
  deepStrictEqual(strStr('hello', 'll'), 2);
});

test('Case 2', function() {
  deepStrictEqual(strStr('aaaaa', 'bba'), -1);
});

test('Case 3', function() {
  deepStrictEqual(strStr('sadbutsad', 'sad'), 0);
});

test('Case 4', function() {
  deepStrictEqual(strStr('leetcode', 'leeto'), -1);
});