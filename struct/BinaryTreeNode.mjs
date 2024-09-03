/**
 * 二叉树
 * Definition for a binary tree node.
 */
export class BinaryTreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 创建二叉树
 * @return { BinaryTreeNode }
 */
export function createBinaryTreeNode() {
  return new BinaryTreeNode(...arguments);
}