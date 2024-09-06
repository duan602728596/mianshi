import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createBinaryTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 */

/**
 * @param { BinaryTreeNode } root
 * @return { boolean }
 */
function isSymmetric(root) {
  const leftArray = [root],
    rightArray = [root];
  let result = true;

  while (leftArray.length && rightArray.length) {
    if (leftArray[0]?.val === rightArray[0]?.val) {
      if (leftArray[0] !== null && rightArray[0] !== null) {
        leftArray.push(leftArray[0].left, leftArray[0].right);
        rightArray.push(rightArray[0].right, rightArray[0].left);
      }

      leftArray.shift();
      rightArray.shift();
    } else {
      result = false;
      break;
    }
  }

  return result;
}

test('Case 1', function() {
  const tree = h(1,
    h(2,
      h(3),
      h(4)
    ),
    h(2,
      h(4),
      h(3)
    )
  );

  deepStrictEqual(isSymmetric(tree), true);
});

test('Case 2', function() {
  const tree = h(1,
    h(2,
      null,
      h(3)
    ),
    h(2,
      null,
      h(3)
    )
  );

  deepStrictEqual(isSymmetric(tree), false);
});