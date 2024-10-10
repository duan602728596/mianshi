import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 「外观数列」是一个数位字符串序列，由递归公式定义：
 *
 * countAndSay(1) = "1"
 * countAndSay(n) 是 countAndSay(n-1) 的行程长度编码。
 *
 * 行程长度编码（RLE）是一种字符串压缩方法，其工作原理是通过将连续相同字符（重复两次或更多次）替换为字符重复次数（运行长度）和字符的串联。
 * 例如，要压缩字符串 "3322251" ，我们将 "33" 用 "23" 替换，将 "222" 用 "32" 替换，将 "5" 用 "15" 替换并将 "1" 用 "11" 替换。因此压缩后字符串变为 "23321511"。
 *
 * 给定一个整数 n ，返回 外观数列 的第 n 个元素。
 */

/**
 * 字符串压缩
 * @param { string } s
 */
function rle(s) {
  let strCache = null;  // 字符串
  let strLength = null; // 字符串数量
  let rs = '';

  for (let i = 0; i < s.length; i++) {
    if (strCache === null) {
      strCache = s[i];
      strLength = 1;
      continue;
    }

    if (strCache !== s[i]) {
      rs = `${ rs }${ strLength }${ strCache }`;
      strCache = s[i];
      strLength = 1;
    } else {
      strLength++;
    }
  }

  if (strCache !== null) rs = `${ rs }${ strLength }${ strCache }`;

  return rs;
}

/**
 * @param { number } n
 * @return { string }
 */
function countAndSay(n) {
  let result = '1';

  for (let i = 2; i <= n; i++) {
    result = rle(result);
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(countAndSay(4), '1211');
});

test('Case 2', function() {
  deepStrictEqual(countAndSay(1), '1');
});