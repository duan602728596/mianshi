import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 * 示例 1：
 * 1 -> 2 -> 3 -> 4 -> 5， n = 2
 * 1 -> 2 -> 3 ->      5
 */

/**
 * @param { ListNode } head
 * @param { number } n
 * @return { ListNode }
 */
function removeNthFromEnd(head, n) {
  // 需要从length - n处删除
  let length = 0;

  /**
   * 搜索
   * @param { ListNode } node
   * @param { number } latestIndex
   */
  function search(node, latestIndex) {
    if (node === null) return;

    // 当前的index之类的
    const idx = latestIndex + 1;

    length += 1;

    search(node.next, idx);

    if (length - n === idx) {
      node.next = node?.next?.next ?? null;
    }
  }

  search(head, 0);

  if (length - n === 0) return head.next;

  return head;
}

test('Case 1', function() {
  const head = createLinkedList([1, 2, 3, 4, 5]);
  const result = removeNthFromEnd(head, 2);

  deepStrictEqual(result, createLinkedList([1, 2, 3, 5]));
});

test('Case 2', function() {
  const head = createLinkedList([1, 2]);
  const result = removeNthFromEnd(head, 1);

  deepStrictEqual(result, createLinkedList([1]));
});