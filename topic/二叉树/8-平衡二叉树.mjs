import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给定一个二叉树，判断它是否是平衡二叉树
 * 平衡二叉树 是指该树所有节点的左右子树的深度相差不超过 1。
 */

/**
 * @param { TreeNode } root
 * @return { boolean }
 */
function isBalanced(root) {
  if (!root) return true;

  let result = true;

  /**
   * 计算深度
   * @param { TreeNode } node
   * @param { number } index
   */
  function calculatingDepth(node, index) {
    if (result === false) return;

    let [left, right] = [index + 1, index + 1];

    if (node.left) {
      left = calculatingDepth(node.left, left);
    }

    if (node.right) {
      right = calculatingDepth(node.right, right);
    }

    if (Math.abs(left - right) > 1) result = false;

    return Math.max(left, right);
  }

  calculatingDepth(root, 0);

  return result;
}

test('Case 1', function() {
  const root = h(3,
    h(9),
    h(20,
      h(15),
      h(7)
    )
  );

  deepStrictEqual(isBalanced(root), true);
});

test('Case 2', function() {
  const root = h(1,
    h(2,
      h(3,
        h(4),
        h(4)
      ),
      h(3)
    ),
    h(2)
  );

  deepStrictEqual(isBalanced(root), false);
});