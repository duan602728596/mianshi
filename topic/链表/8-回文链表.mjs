import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList } from '../../struct/LinkedList.mjs';


/**
 * 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
 */

/**
 * @param { ListNode } head
 * @return { boolean }
 */
function isPalindrome(head) {
  const cache = [];
  let current = head;
  let result = true;

  while (current) {
    cache.push(current.val);
    current = current.next;
  }

  while (cache.length >= 2) {
    if (cache.shift() !== cache.pop()) {
      result = false;
      break;
    }
  }

  return result;
}

test('Case 1', function() {
  const head = createLinkedList([1, 2, 2, 1]);

  deepStrictEqual(isPalindrome(head), true);
});

test('Case 2', function() {
  const head = createLinkedList([1, 2]);

  deepStrictEqual(isPalindrome(head), false);
});