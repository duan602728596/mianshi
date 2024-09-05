import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';


/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。
 * 字母异位词是通过重新排列不同单词或短语的字母而形成的单词或短语，并使用所有原字母一次。
 */

/**
 * @param { string } s
 * @param { string } t
 * @return { boolean }
 */
function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const map = {};

  for (let i = 0; i < s.length; i++) {
    const item1 = s[i],
      item2 = t[i];

    map[item1] ??= 0;
    map[item2] ??= 0;

    map[item1]++;
    map[item2]--;
  }

  return Object.values(map).every((item) => item === 0);
}

test('Case 1', function() {
  deepStrictEqual(isAnagram('anagram', 'nagaram'), true);
});

test('Case 2', function() {
  deepStrictEqual(isAnagram('rat', 'car'), false);
});