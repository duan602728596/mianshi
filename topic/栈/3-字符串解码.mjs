import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 */

/**
 * @param { string } s
 * @return { string }
 */
function decodeString(s) {
  const len = [1], // 重复次数
    key = [''];      // 重复的值
  let number = '';    // 数字缓存

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // 开始
    if (/\d/.test(char)) {
      number += char;
      continue;
    } else if (char === '[') {
      key.unshift('');
      len.unshift(Number(number));
      number = '';
      continue;
    } else if (char === ']') {
      const str = key.shift().repeat(Number(len.shift()));

      key[0] += str;
      continue;
      // 结束
    }

    key[0] += char;
  }

  return key[0];
}

test('Case 1', function() {
  const result = decodeString('3[a]2[bc]');

  deepStrictEqual(result, 'aaabcbc');
});

test('Case 2', function() {
  const result = decodeString('3[a2[c]]');

  deepStrictEqual(result, 'accaccacc');
});

test('Case 3', function() {
  const result = decodeString('100[leetcode]');

  deepStrictEqual(result, 'leetcode'.repeat(100));
});