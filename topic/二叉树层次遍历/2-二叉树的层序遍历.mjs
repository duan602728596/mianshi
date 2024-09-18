import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。（即逐层地，从左到右访问所有节点）。
 */

/**
 * @param { TreeNode } root
 * @return { Array<number[]> }
 */
function levelOrder(root) {
  if (!root) return [];

  let cache = [root],
    childrenCache = [],
    index = 0;
  const result = [];

  while (cache.length) {
    const item = cache[0];

    result[index] ??= [];
    result[index].push(item.val);

    // 遍历子树且删除当前节点
    item.right && childrenCache.unshift(item.right);
    item.left && childrenCache.unshift(item.left);

    cache.shift();

    if (cache.length === 0) {
      cache = childrenCache;
      childrenCache = [];
      index++;
    }
  }

  return result;
}

test('Case 1', function() {
  const root = h(3,
      h(9),
      h(20,
        h(15),
        h(7)
      )
    ),
    result = levelOrder(root);

  deepStrictEqual(result, [[3], [9, 20], [15, 7]]);
});

test('Case 2', function() {
  const root = h(1),
    result = levelOrder(root);

  deepStrictEqual(result, [[1]]);
});

test('Case 3', function() {
  const root = null,
    result = levelOrder(root);

  deepStrictEqual(result, []);
});