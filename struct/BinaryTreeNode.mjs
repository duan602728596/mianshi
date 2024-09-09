/**
 * 二叉树
 * Definition for a binary tree node.
 */
export class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 创建二叉树
 * @return { TreeNode }
 */
export function createTreeNode() {
  return new TreeNode(...arguments);
}