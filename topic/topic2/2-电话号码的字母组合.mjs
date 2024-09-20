import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 */

/**
 * @param { string } digits
 * @return { Array<string> }
 */
function letterCombinations(digits) {
  if (digits === '') return [];

  const numberMap = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
  };

  if (digits.length === 1) return numberMap[digits];

  const result = [];

  /**
   * @param { string } str - 字符串
   * @param { number } index - digits的索引
   */
  function getStrFromNumber(str, index) {
    if (index === digits.length) {
      return result.push(str);
    }

    for (const s of numberMap[digits[index]]) {
      getStrFromNumber(`${ str }${ s }`, index + 1);
    }
  }

  getStrFromNumber('', 0);

  return result;
}

test('Case 1', function() {
  deepStrictEqual(letterCombinations('23'), ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
});

test('Case 2', function() {
  deepStrictEqual(letterCombinations(''), []);
});

test('Case 3', function() {
  deepStrictEqual(letterCombinations('2'), ['a', 'b', 'c']);
});