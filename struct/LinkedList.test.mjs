import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createLinkedList, printLinkedList, ListNode } from './LinkedList.mjs';

const listNode = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const listNodeArr = [1, 2, 3, 4, 5];

test('createLinkedList', function() {
  deepStrictEqual(createLinkedList(listNodeArr), listNode);
});

test('printLinkedList', function() {
  deepStrictEqual(printLinkedList(listNode), listNodeArr);
});