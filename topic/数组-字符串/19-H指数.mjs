import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
 * 根据维基百科上 h 指数的定义：h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且 至少 有 h 篇论文被引用次数大于等于 h 。如果 h 有多种可能的值，h 指数 是其中最大的那个。
 */

/**
 * 被引用次数大于等于 i 的论文数量
 * @param { Array<number> } citations
 * @param { number } h - 当前需要判断的h值
 * @param { number } countGreaterThanOrEqualTo - 已经被引用次数大于等于i的论文数量
 */
function getHLength(citations, h, countGreaterThanOrEqualTo) {
  let len = countGreaterThanOrEqualTo;
  let j = 0;

  while (j < citations.length) {
    if (citations[j] >= h) {
      len++;
      citations.splice(j, 1);
    } else {
      j++;
    }
  }

  return len;
}

/**
 * @param { Array<number> } citations
 * @return { number }
 */
function hIndex(citations) {
  let HResult = 0; // H指数
  let countGreaterThanOrEqualTo = 0;  // 已经被引用次数大于等于 i 的论文数量

  for (let h = citations.length; h > 0; h--) {
    const len = getHLength(citations, h, countGreaterThanOrEqualTo);

    if (len >= h) {
      HResult = h;
      break;
    } else {
      countGreaterThanOrEqualTo = len;
    }
  }

  return HResult;
}

test('Case 1', function() {
  const citations = [3, 0, 6, 1, 5];

  deepStrictEqual(hIndex(citations), 3);
});

test('Case 2', function() {
  const citations = [1, 3, 1];

  deepStrictEqual(hIndex(citations), 1);
});

test('Case 3', function() {
  const citations = [4, 1, 2, 7, 5, 3, 1];

  deepStrictEqual(hIndex(citations), 3);
});