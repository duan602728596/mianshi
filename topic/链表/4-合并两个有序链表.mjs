import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList, printLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 * 1->2->4, 1->3->4 => 1->1->2->3->4->4
 */

/**
 * @param { ListNode } list1
 * @param { ListNode } list2
 * @return { ListNode }
 */
function mergeTwoLists(list1, list2) {
  if (!list1) return list2;

  if (!list2) return list1;

  const min = list1.val < list2.val;
  let current1 = min ? list1 : list2;
  let current2 = min ? list2 : list1;

  while (current2 !== null) {
    const l1Value = current1.next?.val ?? null;
    const l2Value = current2.val;

    if (l1Value === null || l1Value >= l2Value) {
      // 合并链表
      const nextNode = current1.next;

      current1.next = current2;
      current2 = current2.next;
      current1 = current1.next;
      current1.next = nextNode;
    } else {
      current1.next && (current1 = current1.next);
    }
  }

  return min ? list1 : list2;
}

test('Case 1', function() {
  const n1 = createLinkedList([1, 2, 4]);
  const n2 = createLinkedList([1, 3, 4]);

  deepStrictEqual(printLinkedList(mergeTwoLists(n1, n2)), [1, 1, 2, 3, 4, 4]);
});

test('Case 2', function() {
  const n1 = createLinkedList([]);
  const n2 = createLinkedList([]);

  deepStrictEqual(printLinkedList(mergeTwoLists(n1, n2)), []);
});

test('Case 3', function() {
  const n1 = createLinkedList([]);
  const n2 = createLinkedList([0]);

  deepStrictEqual(printLinkedList(mergeTwoLists(n1, n2)), [0]);
});

test('Case 4', function() {
  const n1 = createLinkedList([2]);
  const n2 = createLinkedList([1]);

  deepStrictEqual(printLinkedList(mergeTwoLists(n1, n2)), [1, 2]);
});