import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList, printLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 *
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 *
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */

/**
 * @param { ListNode } l1
 * @param { ListNode } l2
 * @return { ListNode }
 */
function addTwoNumbers(l1, l2) {
  let l1Current = l1,
    l2Current = l2;
  let result;
  let resultCurrent = null;
  let nextValue = 0;

  while (!(l1Current === null && l2Current === null && nextValue === 0)) {
    const l1Value = l1Current?.val ?? 0;
    const l2Value = l2Current?.val ?? 0;
    const value = l1Value + l2Value + nextValue;
    const intValue = value % 10;

    nextValue = Math.floor(value / 10);

    if (resultCurrent === null) {
      result = resultCurrent = new ListNode(intValue);
    } else {
      resultCurrent.next = new ListNode(intValue);
      resultCurrent = resultCurrent.next;
    }

    l1Current = l1Current?.next ?? null;
    l2Current = l2Current?.next ?? null;
  }

  return result;
}

test('Case 1', function() {
  const n1 = createLinkedList([2, 4, 3]);
  const n2 = createLinkedList([5, 6, 4]);

  deepStrictEqual(printLinkedList(addTwoNumbers(n1, n2)), [7, 0, 8]);
});

test('Case 2', function() {
  const n1 = createLinkedList([9, 9, 9, 9, 9, 9, 9]);
  const n2 = createLinkedList([9, 9, 9, 9]);

  deepStrictEqual(printLinkedList(addTwoNumbers(n1, n2)), [8, 9, 9, 9, 0, 0, 0, 1]);
});