import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { createLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
 */

/**
 * @param { ListNode } head
 * @return { ListNode }
 */
function deleteDuplicates(head) {
  if (!head) return null;

  let prevCur = null;
  let cur = head;
  let cacheStart = null;
  let returnHead = head;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const next = cur.next;

    if (!next) break;

    // 有重复
    if (cur.val === next.val) {
      if (returnHead === cur) returnHead = null;

      if (prevCur) cacheStart ??= prevCur;

      [prevCur, cur] = [cur, next];
      continue;
    }

    returnHead ??= next; // 从头删除时要更新

    // 无重复时
    if (cacheStart) {
      cacheStart.next = next;
      [prevCur, cur] = [cacheStart, next];
      cacheStart = null;
    } else {
      [prevCur, cur] = [cur, next];
    }
  }

  if (cacheStart) cacheStart.next = null;

  return returnHead;
}

test('Case 1', function() {
  const head = createLinkedList([1, 2, 3, 3, 4, 4, 5]);
  const result = deleteDuplicates(head);

  deepStrictEqual(result, createLinkedList([1, 2, 5]));
});

test('Case 2', function() {
  const head = createLinkedList([1, 1, 1, 2, 3]);
  const result = deleteDuplicates(head);

  deepStrictEqual(result, createLinkedList([2, 3]));
});

test('Case 3', function() {
  const head = createLinkedList([1, 2, 2]);
  const result = deleteDuplicates(head);

  deepStrictEqual(result, createLinkedList([1]));
});

test('Case 4', function() {
  const head = createLinkedList([1, 1, 2, 2]);
  const result = deleteDuplicates(head);

  deepStrictEqual(result, createLinkedList([]));
});