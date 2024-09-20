import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 */

/**
 * @param { number } n
 * @return { Array<string> }
 */
function generateParenthesis(n) {
  const result = [];

  /**
   * 创建字符串
   * @param { string } str
   * @param { number } usedLeft - 使用"("的数量
   * @param { number } usedRight - 使用")"的数量
   */
  function createString(str, usedLeft, usedRight) {
    if (usedLeft < n) {
      createString(`${ str }(`, usedLeft + 1, usedRight);
    }

    if (usedRight < n && usedRight < usedLeft) {
      createString(`${ str })`, usedLeft, usedRight + 1);
    }

    if (usedLeft === n && usedRight === n) {
      result.push(str);
    }
  }

  createString('(', 1, 0);

  return result;
}

test('Case 1', function() {
  const result = generateParenthesis(3);
  const output = ['((()))', '(()())', '(())()', '()(())', '()()()'];

  deepStrictEqual(result.every((o) => output.includes(o)) && result.length === output.length, true);
});