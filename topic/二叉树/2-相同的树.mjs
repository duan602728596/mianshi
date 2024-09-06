import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createBinaryTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 */

/**
 * @param { BinaryTreeNode } p
 * @param { BinaryTreeNode } q
 * @return { boolean }
 */
function isSameTree(p, q) {
  const pArray = [p];
  const qArray = [q];
  let result = true;

  while (pArray.length !== 0 && qArray.length !== 0) {
    if (pArray[0]?.val === qArray[0]?.val) {
      if (pArray[0] !== null && qArray[0] !== null) {
        pArray.push(pArray[0].left, pArray[0].right);
        qArray.push(qArray[0].left, qArray[0].right);
      }

      pArray.shift();
      qArray.shift();
    } else {
      result = false;
      break;
    }
  }

  return result;
}

test('Case 1', function() {
  const tree = h(1,
    h(2),
    h(3)
  );
  const tree2 = structuredClone(tree);

  deepStrictEqual(isSameTree(tree, tree2), true);
});

test('Case 2', function() {
  const tree = h(1,
    null,
    h(2)
  );
  const tree2 = h(1,
    h(2),
    null
  );

  deepStrictEqual(isSameTree(tree, tree2), false);
});

test('Case 3', function() {
  const tree = h(1,
    h(2),
    h(1)
  );
  const tree2 = h(1,
    h(1),
    h(2)
  );

  deepStrictEqual(isSameTree(tree, tree2), false);
});