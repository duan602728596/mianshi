import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。
 * 这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。
 *
 * 示例1:
 * 输入: pattern = "abba", s = "dog cat cat dog"
 * 输出: true
 *
 * 示例 2:
 * 输入:pattern = "abba", s = "dog cat cat fish"
 * 输出: false
 *
 * 示例 3:
 * 输入: pattern = "aaaa", s = "dog cat cat dog"
 * 输出: false
 */

/**
 * @param { string } pattern
 * @param { string } s
 * @return { boolean }
 */
function wordPattern(pattern, s) {
  const sArray = s.split(' ');

  if (pattern.length !== sArray.length) {
    return false;
  }

  let hash1 = '',
    hash2 = '';

  for (let i = 0; i < pattern.length; i++) {
    const index1 = pattern.indexOf(pattern[i]),
      index2 = sArray.indexOf(sArray[i]);

    hash1 += `${ index1 },`;
    hash2 += `${ index2 },`;

    if (hash1 !== hash2) {
      return false;
    }
  }

  return hash1 === hash2;
}

test('Case 1', function() {
  deepStrictEqual(wordPattern('abba', 'dog cat cat dog'), true);
});

test('Case 2', function() {
  deepStrictEqual(wordPattern('abba', 'dog cat cat fish'), false);
});

test('Case 3', function() {
  deepStrictEqual(wordPattern('aaaa', 'dog cat cat dog'), false);
});