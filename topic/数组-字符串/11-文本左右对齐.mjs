import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个单词数组 words 和一个长度 maxWidth ，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。
 *
 * 你应该使用 “贪心算法” 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。
 *
 * 要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。
 *
 * 文本的最后一行应为左对齐，且单词之间不插入额外的空格。
 *
 * 注意:
 *
 * 单词是指由非空格字符组成的字符序列。
 * 每个单词的长度大于 0，小于等于 maxWidth。
 * 输入单词数组 words 至少包含一个单词。
 */

/**
 * 转换成字符串
 * @param { Array<string> } cacheWords
 * @param { number } cacheWordsLength
 * @param { number } maxWidth
 * @param { boolean } [isEnd] - 最后一行
 */
function arrayToString(cacheWords, cacheWordsLength, maxWidth, isEnd) {
  if (cacheWords.length === 1) {
    return cacheWords[0].padEnd(maxWidth, ' ');
  }

  if (isEnd) {
    return cacheWords.join(' ').padEnd(maxWidth, ' ');
  }

  const spaceLength = maxWidth - cacheWordsLength;
  const len = cacheWords.length - 1;
  const basic = Math.floor(spaceLength / len),
    add = spaceLength % len;
  let result = '';

  for (let i = 0, k = cacheWords.length - 1; i <= k; i++) {
    result += cacheWords[i];

    // 补充空格
    if (i !== k) {
      result += ' '.repeat(basic);

      if (add > i) result += ' ';
    }
  }

  return result;
}

/**
 * @param { Array<string> } words
 * @param { number } maxWidth
 * @return { Array<string> }
 */
function fullJustify(words, maxWidth) {
  let cache = [];
  let length = 0;
  const result = [];

  for (let i = 0, j = words.length - 1; i <= j; i++) {
    const word = words[i];
    const len = length // 之前单词的长度
      + word.length          // 新单词的长度
      + cache.length;        // 单词的最小间隔数

    if (len <= maxWidth) {
      // 长度小，还可以加
      cache.push(word);
      length += word.length;
    } else {
      // 超了，需要处理
      result.push(arrayToString(cache, length, maxWidth));
      cache = [word];
      length = word.length;
    }
  }

  // 最后一行
  result.push(arrayToString(cache, length, maxWidth, true));

  return result;
}

test('Case 1', function() {
  deepStrictEqual(fullJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16), [
    'This    is    an',
    'example  of text',
    'justification.  '
  ]);
});

test('Case 2', function() {
  deepStrictEqual(fullJustify(['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16), [
    'What   must   be',
    'acknowledgment  ',
    'shall be        '
  ]);
});

test('Case 3', function() {
  deepStrictEqual(fullJustify(['Science', 'is', 'what', 'we', 'understand', 'well', 'enough', 'to', 'explain', 'to', 'a', 'computer.', 'Art', 'is', 'everything', 'else', 'we', 'do'], 20), [
    'Science  is  what we',
    'understand      well',
    'enough to explain to',
    'a  computer.  Art is',
    'everything  else  we',
    'do                  '
  ]);
});