import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 * 注意：不能使用任何内置的 BigInteger 库或直接将输入转换为整数。
 */

/**
 * 相加，避免超出范围
 * @param { string } num1
 * @param { string } num2
 * @return { string }
 */
function numberAdd(num1, num2) {
  const num1Array = num1.split('').reverse(),
    num2Array = num2.split('').reverse(),
    maxLength = Math.max(num1Array.length, num2Array.length);
  let result = '';
  let add2 = 0;

  for (let i = 0; i < maxLength; i++) {
    const [a, b] = [Number(num1Array[i] ?? 0), Number(num2Array[i] ?? 0)];
    const value = a + b + add2;
    const t = value % 10;

    add2 = Math.floor(value / 10);
    result = `${ t }${ result }`;
  }

  if (add2 !== 0) result = `${ add2 }${ result }`;

  return result;
}

/**
 * @param { string } num1
 * @param { string } num2
 * @return { string }
 */
function multiply(num1, num2) {
  // 超出范围
  const a12 = num1.length > num2.length;
  const num1Array = (a12 ? num1 : num2).split('').reverse(),
    num2Array = (a12 ? num2 : num1).split('').reverse();
  let result = '0';

  for (let i = 0; i < num2Array.length; i++) {
    const a = Number(num2Array[i]);
    let oneResult = '';
    let add = 0;

    for (let j = 0; j < num1Array.length; j++) {
      const b = Number(num1Array[j]);
      const value = (a * b * (10 ** i)) + add;
      const t = value % 10;

      add = Math.floor(value / 10);
      oneResult = `${ t }${ oneResult }`;
    }

    if (add !== 0) oneResult = `${ add }${ oneResult }`;

    result = numberAdd(result, oneResult);
  }

  return /^0+$/.test(result) ? '0' : result;
}

test('Case 1', function() {
  deepStrictEqual(multiply('2', '3'), '6');
});

test('Case 2', function() {
  deepStrictEqual(multiply('123', '456'), '56088');
});

test('Case 3', function() {
  deepStrictEqual(multiply('123456789', '987654321'), '121932631112635269');
});

test('Case 4', function() {
  deepStrictEqual(multiply('9133', '0'), '0');
});

test('Case 5', function() {
  deepStrictEqual(multiply('17849419788197', '877968504004372811'), '15671228388789369086481445511767');
});

test('Case 6', function() {
  deepStrictEqual(multiply('96423702883453279', '72156405165936898'), '6957587772858372748255887645188542');
});