import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 */

/**
 * 判断是否是异位词
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

/**
 * 判断groups中是否存在异位词
 * @param { Array<Array<string>> } groups
 * @param { string } str
 * @param { Array<string> } strs
 */
function anagramsInGroup(groups, str, strs) {
  for (const group of groups) {
    const item = group[0];

    if (isAnagram(item, str)) {
      return group.push(strs.pop());
    }
  }

  groups.push([strs.pop()]);
}

/**
 * @param { Array<string> } strs
 * @return { Array<Array<string>> }
 */
function groupAnagrams(strs) {
  const groups = [[strs.pop()]];

  for (let i = strs.length - 1; i >= 0; i--) {
    anagramsInGroup(groups, strs[i], strs);
  }

  return groups;
}

test('Case 1', function() {
  deepStrictEqual(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']), [['bat'], ['nat', 'tan'], ['ate', 'tea', 'eat']]);
});

test('Case 2', function() {
  deepStrictEqual(groupAnagrams(['']), [['']]);
});

test('Case 3', function() {
  deepStrictEqual(groupAnagrams(['a']), [['a']]);
});