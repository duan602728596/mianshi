import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createLinkedList, printLinkedList } from '../struct/LinkedList.mjs';

/**
 * 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
 *
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 *
 * 输入：head = [0,1,2], k = 4
 * 输出：[2,0,1]
 */

/**
 * @param { ListNode } head
 * @param { number } k
 * @return { ListNode }
 */
function rotateRight(head, k) {
  // 空链表
  if (!head) return null;

  // k为0直接不移动
  if (k === 0) return head;

  let endNode = null;
  let current = head;
  let headLength = 0;

  // 查找链表尾，同时计算链表长度
  // eslint-disable-next-line no-constant-condition
  while (true) {
    headLength++;

    if (current.next === null) {
      endNode = current;
      break;
    } else {
      current = current.next;
    }
  }

  // 长度为1的链表不旋转
  if (headLength === 1) return head;

  const m = k % headLength;

  // 旋转后与原来相同
  if (m === 0) return head;

  // 从链表头开始移动
  // 尾节点指向头节点
  current = head;
  endNode.next = head;

  const n = headLength - m - 1;

  let nextCurrent;
  let i = 0;

  while (i <= n) {
    if (i === n) {
      nextCurrent = current.next;
      current.next = null;
      break;
    } else {
      current = current.next;
      i++;
    }
  }

  return nextCurrent;
}

test('Case 1', function() {
  const nodeList = createLinkedList([1, 2, 3, 4, 5]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 2)), [4, 5, 1, 2, 3]);
});

test('Case 2', function() {
  const nodeList = createLinkedList([0, 1, 2]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 4)), [2, 0, 1]);
});

test('Case 3', function() {
  const nodeList = createLinkedList([1, 2]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 0)), [1, 2]);
});

test('Case 4', function() {
  const nodeList = createLinkedList([1, 2]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 1)), [2, 1]);
});

test('Case 5', function() {
  const nodeList = createLinkedList([1, 2, 3, 4, 5]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 1)), [5, 1, 2, 3, 4]);
});

test('Case 6', function() {
  const nodeList = createLinkedList([1]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 1)), [1]);
});

test('Case 7', function() {
  const nodeList = createLinkedList([1, 2]);

  deepStrictEqual(printLinkedList(rotateRight(nodeList, 2)), [1, 2]);
});