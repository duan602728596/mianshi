import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 */

/**
 * @param { TreeNode } root
 * @return { Array<number> }
 */
function rightSideView(root) {
  const result = [];

  /**
   *
   * @param { TreeNode } r
   * @param { number } index
   */
  function getViewRight(r, index) {
    if (r === null) return;

    result[index] ??= r.val;

    r.right && getViewRight(r.right, index + 1);
    r.left && getViewRight(r.left, index + 1);
  }

  getViewRight(root, 0);

  return result;
}

test('Case 1', function() {
  const root = h(1,
      h(2,
        null,
        h(5)
      ),
      h(3,
        null,
        h(4)
      )
    ),
    result = rightSideView(root);

  deepStrictEqual(result, [1, 3, 4]);
});

test('Case 2', function() {
  const root = h(1,
      null,
      h(3)
    ),
    result = rightSideView(root);

  deepStrictEqual(result, [1, 3]);
});