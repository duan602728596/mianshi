import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createTreeNode as h } from '../../struct/BinaryTreeNode.mjs';

/**
 * 实现一个二叉搜索树迭代器类BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：
 * BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
 * boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
 * int next()将指针向右移动，然后返回指针处的数字。
 * 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。
 *
 * 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。
 */

class BSTIterator {
  /**
   * 二叉树转数组
   * @param { TreeNode } root
   * @param { Array<number> } result
   */
  static rootToArray(root, result) {
    if (!root) return;

    if (root.left) BSTIterator.rootToArray(root.left, result);

    result.push(root.val);

    if (root.right) BSTIterator.rootToArray(root.right, result);
  }

  constructor(root) {
    this.rootArray = [];

    BSTIterator.rootToArray(root, this.rootArray);

    this.index = -1;
  }

  next() {
    if (this.index + 1 < this.rootArray.length) this.index++;

    return this.rootArray[this.index];
  }

  hasNext() {
    return this.index + 1 < this.rootArray.length;
  }
}

test('Case 1', function() {
  const root = h(7, h(3), h(15, h(9), h(20))),
    iterator = new BSTIterator(root);

  deepStrictEqual(iterator.next(), 3);
  deepStrictEqual(iterator.next(), 7);
  deepStrictEqual(iterator.hasNext(), true);
  deepStrictEqual(iterator.next(), 9);
  deepStrictEqual(iterator.hasNext(), true);
  deepStrictEqual(iterator.next(), 15);
  deepStrictEqual(iterator.hasNext(), true);
  deepStrictEqual(iterator.next(), 20);
  deepStrictEqual(iterator.hasNext(), false);
});