import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 */

/**
 * @param { TreeNode } root
 * @return { Array<number[]> }
 */
function zigzagLevelOrder(root) {
  if (!root) return [];

  let cache = [root],
    childrenCache = [],
    index = 0;
  const result = [];

  while (cache.length) {
    const item = cache[0];

    result[index] ??= [];
    result[index].push(item.val);

    // 遍历子树
    if (index % 2 === 1) {
      item.right && childrenCache.unshift(item.right);
      item.left && childrenCache.unshift(item.left);
    } else {
      item.left && childrenCache.unshift(item.left);
      item.right && childrenCache.unshift(item.right);
    }

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
    result = zigzagLevelOrder(root);

  deepStrictEqual(result, [[3], [20, 9], [15, 7]]);
});

test('Case 2', function() {
  const root = h(1,
      h(2,
        h(4)
      ),
      h(3,
        null,
        h(5)
      )
    ),
    result = zigzagLevelOrder(root);

  deepStrictEqual(result, [[1], [3, 2], [4, 5]]);
});