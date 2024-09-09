import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h, TreeNode } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
 */

/**
 * @param { TreeNode } root
 * @return { TreeNode }
 */
function invertTree(root) {
  const nodeArray = [root];

  while (nodeArray.length > 0) {
    if (nodeArray[0] !== null) {
      [nodeArray[0].left, nodeArray[0].right] = [nodeArray[0].right, nodeArray[0].left];
      nodeArray.push(nodeArray[0].left, nodeArray[0].right);
    }

    nodeArray.shift();
  }

  return root;
}

test('Case 1', function() {
  const tree = h(4,
    h(2,
      h(1),
      h(3)
    ),
    h(7,
      h(6),
      h(9)
    )
  );
  const tree2 = h(4,
    h(7,
      h(9),
      h(6)
    ),
    h(2,
      h(3),
      h(1)
    )
  );

  deepStrictEqual(invertTree(tree), tree2);
});

test('Case 2', function() {
  const tree = h(2,
    h(1),
    h(3)
  );
  const tree2 = h(2,
    h(3),
    h(1)
  );

  deepStrictEqual(invertTree(tree), tree2);
});