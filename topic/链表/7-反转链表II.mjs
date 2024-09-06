import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList, printLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
 * 请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 */

/**
 * @param { ListNode } head
 * @param { number } left
 * @param { number } right
 * @return { ListNode }
 */
function reverseBetween(head, left, right) {
  if (!head) return null;

  if (left === right) return head;

  let returnNode = null;
  let index = 1;
  let beforeNode = null;
  let current = head;

  let leftNode = null; // 左侧node
  let rightNode = null; // 右侧node
  let revertLeftNode = null; // 反转开始的node
  let revertRightNode = null; // 反转结束的node

  while (current) {
    if (index < left) {
      returnNode ??= current; // 设置返回的node
    }

    // 记录4个node
    if (index === left - 1) {
      leftNode = current;
    } else if (index === right + 1) {
      rightNode = current;
    } else if (index === left) {
      revertLeftNode = current;
    } else if (index === right) {
      revertRightNode = current;
    }

    // 准备反转链表
    if (index >= left && index <= right) {
      const nextNode = current.next;

      current.next = beforeNode;
      beforeNode = current;
      current = nextNode;
    } else {
      beforeNode = current;
      current = current.next;
    }

    index++;
  }

  // 调换头尾顺序
  revertLeftNode && (revertLeftNode.next = rightNode);
  leftNode && (leftNode.next = revertRightNode);

  return returnNode ?? revertRightNode ?? head;
}

test('Case 1', function() {
  const n1 = createLinkedList([1, 2, 3, 4, 5]);

  deepStrictEqual(printLinkedList(reverseBetween(n1, 2, 4)), [1, 4, 3, 2, 5]);
});

test('Case 2', function() {
  const n1 = createLinkedList([5]);

  deepStrictEqual(printLinkedList(reverseBetween(n1, 1, 1)), [5]);
});

test('Case 3', function() {
  const n1 = createLinkedList([3, 5]);

  deepStrictEqual(printLinkedList(reverseBetween(n1, 2, 2)), [3, 5]);
});