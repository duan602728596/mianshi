import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 每个右括号都有一个对应的相同类型的左括号。
 */

/**
 * @param { string } s
 * @return { boolean }
 */
function isValid(s) {
  const arr = [];
  let result = s.length > 1;

  for (let i = 0; i < s.length; i++) {
    const item = s[i];

    if (['(', '{', '['].includes(item)) {
      arr.push(item);
    } else {
      const arrItem = arr.at(-1);

      if (
        (arrItem === '(' && item === ')')
        || (arrItem === '{' && item === '}')
        || (arrItem === '[' && item === ']')
      ) {
        arr.pop();
      } else {
        result = false;
        break;
      }
    }
  }

  return result && arr.length === 0;
}

test('Case 1', function() {
  deepStrictEqual(isValid('()'), true);
});

test('Case 2', function() {
  deepStrictEqual(isValid('()[]{}'), true);
});

test('Case 3', function() {
  deepStrictEqual(isValid('(]'), false);
});

test('Case 4', function() {
  deepStrictEqual(isValid('([])'), true);
});

test('Case 5', function() {
  deepStrictEqual(isValid('['), false);
});

test('Case 6', function() {
  deepStrictEqual(isValid('(('), false);
});