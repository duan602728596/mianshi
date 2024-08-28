import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给定一个二叉树 root ，返回其最大深度。
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 */

/* Definition for a binary tree node. */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @param { TreeNode } root
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
  const tree = new TreeNode(3,
    new TreeNode(9),
    new TreeNode(20,
      new TreeNode(15),
      new TreeNode(7)
    )
  );
  const len = maxDepth(tree);

  deepStrictEqual(len, 3);
});

test('Case 2', function() {
  const tree = new TreeNode(1,
    null,
    new TreeNode(2)
  );
  const len = maxDepth(tree);

  deepStrictEqual(len, 2);
});