import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createBinaryTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给定一个二叉树 root ，返回其最大深度。
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 */

/**
 * @param { BinaryTreeNode } root
 * @return { number }
 */
function maxDepth(root) {
  if (root === null) {
    return 0;
  }

  let [left, right] = [1, 1];

  left += maxDepth(root.left);
  right += maxDepth(root.right);

  return Math.max(left, right);
}

test('Case 1', function() {
  const tree = h(3,
    h(9),
    h(20,
      h(15),
      h(7)
    )
  );
  const len = maxDepth(tree);

  deepStrictEqual(len, 3);
});

test('Case 2', function() {
  const tree = h(1,
    null,
    h(2)
  );
  const len = maxDepth(tree);

  deepStrictEqual(len, 2);
});