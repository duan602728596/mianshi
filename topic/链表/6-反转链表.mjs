import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList, printLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 */

/**
 * @param { ListNode } head
 * @return { ListNode }
 */
function reverseList(head) {
  if (!head) return null;

  let beforeNode = null;
  let current = head;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (current.next === null) {
      current.next = beforeNode;
      break;
    } else {
      const nextNode = current.next;

      current.next = beforeNode;
      beforeNode = current;
      current = nextNode;
    }
  }

  return current;
}

test('Case 1', function() {
  const n1 = createLinkedList([1, 2, 3, 4, 5]);

  deepStrictEqual(printLinkedList(reverseList(n1)), [5, 4, 3, 2, 1]);
});

test('Case 2', function() {
  const n1 = createLinkedList([1, 2]);

  deepStrictEqual(printLinkedList(reverseList(n1)), [2, 1]);
});