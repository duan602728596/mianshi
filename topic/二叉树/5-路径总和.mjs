import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。如果存在，返回 true；否则，返回 false 。
 * 叶子节点 是指没有子节点的节点。
 */

/**
 * @param { TreeNode } root
 * @param { number } targetSum
 * @return { boolean }
 */
function hasPathSum(root, targetSum) {
  if (!root) return false;

  const nodeCache = [root],
    valueCache = [root.val];
  let result = false;

  while (nodeCache.length && valueCache.length) {
    if (nodeCache[0].left === null && nodeCache[0].right === null) {

      if (valueCache[0] === targetSum) {
        result = true;
        break;
      }
    } else {
      if (nodeCache[0].left !== null) {
        nodeCache.push(nodeCache[0].left);
        valueCache.push(valueCache[0] + nodeCache[0].left.val);
      }

      if (nodeCache[0].right !== null) {
        nodeCache.push(nodeCache[0].right);
        valueCache.push(valueCache[0] + nodeCache[0].right.val);
      }
    }

    nodeCache.shift();
    valueCache.shift();
  }

  return result;
}

test('Case 1', function() {
  const tree = h(5,
    h(4,
      h(11,
        h(7),
        h(2)
      )
    ),
    h(8,
      h(13),
      h(4,
        null,
        h(1)
      )
    )
  );

  deepStrictEqual(hasPathSum(tree, 22), true);
});

test('Case 2', function() {
  const tree = h(1,
    h(2),
    h(3)
  );

  deepStrictEqual(hasPathSum(tree, 5), false);
});