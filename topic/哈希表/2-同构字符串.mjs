import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定两个字符串 s 和 t ，判断它们是否是同构的。
 * 如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
 * 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
 */

/**
 * @param { string } s
 * @param { string } t
 * @return { boolean }
 */
function isIsomorphic(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const map = {},
    map2 = {};
  let hash = '';

  for (let i = 0; i < s.length; i++) {
    const item1 = s[i],
      item2 = t[i];

    // 保证字符串相互对应
    if (!map[item2] && !map2[item1]) {
      map[item2] = item1;
      map2[item1] = item2;
    }

    if (map[item2]) {
      hash += map[item2];
    } else {
      return false;
    }
  }

  return s === hash;
}

test('Case 1', function() {
  deepStrictEqual(isIsomorphic('egg', 'add'), true);
});

test('Case 2', function() {
  deepStrictEqual(isIsomorphic('foo', 'bar'), false);
});

test('Case 3', function() {
  deepStrictEqual(isIsomorphic('paper', 'title'), true);
});