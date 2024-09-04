import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 * boyer-moore算法最简单理解方法： 假设你在投票选人 如果你和候选人（利益）相同，你就会给他投一票（count+1），
 * 如果不同，你就会踩他一下（count-1）当候选人票数为0（count=0）时，就换一个候选人，但因为和你利益一样的人占比超过了一半 不论换多少次 ，
 * 最后留下来的都一定是个和你（利益）相同的人。
 */

/**
 * @param { Array<number> } nums
 * @return { number }
 */
function majorityElement(nums) {
  let count = 0;
  let target = null;

  for (const num of nums) {
    if (count === 0) {
      target = num;
    }

    count += num === target ? 1 : -1;
  }

  return target;
}

test('Case 1', function() {
  const a1 = [3, 2, 3];
  const k = majorityElement(a1);

  deepStrictEqual(k, 3);
});

test('Case 2', function() {
  const a1 = [2, 2, 1, 1, 1, 2, 2];
  const k = majorityElement(a1);

  deepStrictEqual(k, 2);
});