import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 每条从根节点到叶节点的路径都代表一个数字：
 *
 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 * 计算从根节点到叶节点生成的 所有数字之和 。
 *
 * 叶节点 是指没有子节点的节点。
 */

/**
 * @param { TreeNode } root
 * @return { number }
 */
function sumNumbers(root) {
  const cache = [root],
    values = [root.val];
  let result = 0;

  while (cache.length > 0) {
    const { left, right } = cache[0];

    if (left === null && right === null) {
      result += values[0];
      cache.shift();
      values.shift();
      continue;
    }

    const v = values.shift();

    cache.shift();

    if (left !== null) {
      cache.push(left);
      values.push(Number(`${ v }${ left.val }`));
    }

    if (right !== null) {
      cache.push(right);
      values.push(Number(`${ v }${ right.val }`));
    }
  }

  return result;
}

test('Case 1', function() {
  const root = h(1, h(2), h(3));

  deepStrictEqual(sumNumbers(root), 25);
});

test('Case 2', function() {
  const root = h(4, h(9, h(5), h(1)), h(0));

  deepStrictEqual(sumNumbers(root), 1026);
});