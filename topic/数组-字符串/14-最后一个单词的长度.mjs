import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
 * 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 */

/**
 * @param { string } s
 * @return { number }
 */
function lengthOfLastWord(s) {
  let cache = [];
  let len = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ' ') {
      if (cache.length) {
        len = cache.length;
        cache = [];
        break;
      }
    } else {
      cache.push(s[i]);
    }
  }

  return cache.length ? cache.length : len;
}

test('Case 1', function() {
  deepStrictEqual(lengthOfLastWord('Hello World'), 5);
});

test('Case 2', function() {
  deepStrictEqual(lengthOfLastWord('   fly me   to   the moon  '), 4);
});

test('Case 3', function() {
  deepStrictEqual(lengthOfLastWord('luffy is still joyboy'), 6);
});