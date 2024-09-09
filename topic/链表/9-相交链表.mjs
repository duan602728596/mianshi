import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
 */

/**
 * @param { ListNode } headA
 * @param { ListNode } headB
 * @return { ListNode }
 */
function getIntersectionNode(headA, headB) {
  let currentA = headA;
  let currentB = headB;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (currentA === currentB) {
      return currentA;
    }

    if (currentA.next === null && currentB.next === null) {
      break;
    } else {
      currentA = currentA.next ?? headB;
      currentB = currentB.next ?? headA;
    }
  }

  return null;
}

test('Case 1', function() {
  const headA1 = new ListNode(4);
  const headA2 = new ListNode(1);

  headA1.next = headA2;

  const headB1 = new ListNode(5);
  const headB2 = new ListNode(6);
  const headB3 = new ListNode(1);

  headB1.next = headB2;
  headB2.next = headB3;

  const headM = createLinkedList([8, 4, 5]);

  headA2.next = headB3.next = headM;

  deepStrictEqual(getIntersectionNode(headA1, headB1), headM);
});

test('Case 2', function() {
  const headA1 = new ListNode(1);
  const headA2 = new ListNode(9);
  const headA3 = new ListNode(1);

  headA1.next = headA2;
  headA2.next = headA3;

  const headB1 = new ListNode(3);
  const headM = createLinkedList([2, 4]);

  headA3.next = headB1.next = headM;

  deepStrictEqual(getIntersectionNode(headA1, headB1), headM);
});