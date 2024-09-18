import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 给定一个非空二叉树的根节点 root , 以数组的形式返回每一层节点的平均值。与实际答案相差 10-5 以内的答案可以被接受。
 */

/**
 * @param { TreeNode } root
 * @return { Array<number> }
 */
function averageOfLevels(root) {
  if (!root) return [];

  let cache = [root],
    childrenCache = [],
    index = 0,
    length = null,
    allValue = 0;
  const result = [];

  while (cache.length) {
    const item = cache[0];

    // 计算总数和值
    length ??= cache.length;
    allValue += item.val;

    // 遍历子树且删除当前节点
    item.left && childrenCache.push(item.left);
    item.right && childrenCache.push(item.right);
    cache.shift();

    if (cache.length === 0) {
      cache = childrenCache;
      childrenCache = [];
      result[index] = allValue / length;
      index++;
      allValue = 0;
      length = null;
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
    result = averageOfLevels(root);

  deepStrictEqual(result, [3, 14.5, 11]);
});

test('Case 2', function() {
  const root = h(3,
      h(9,
        h(15),
        h(7)
      ),
      h(20)
    ),
    result = averageOfLevels(root);

  deepStrictEqual(result, [3, 14.5, 11]);
});