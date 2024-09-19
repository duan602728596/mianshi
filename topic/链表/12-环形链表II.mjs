import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 *
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
 *
 * 不允许修改 链表。
 * ！哈希表 or 快慢指针
 */

/**
 * @param { ListNode } head
 * @return { ListNode }
 */
function detectCycle(head) {
  if (!head) return null;

  let slowCurrent = head; // 慢指针
  let fastCurrent = head; // 快指针
  let resultNode = null;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    slowCurrent = slowCurrent?.next ?? null;
    fastCurrent = fastCurrent?.next?.next ?? null;

    if (slowCurrent === null || fastCurrent === null) break;

    if (slowCurrent === fastCurrent) {
      resultNode = slowCurrent;
      break;
    }
  }

  if (!resultNode) return null;

  let cursor = head;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (cursor === resultNode) {
      return cursor;
    }

    cursor = cursor.next;
    resultNode = resultNode.next;
  }

  return resultNode;
}

test('Case 1', function() {
  const linkNodeEnd = new ListNode(-4);
  const linkNode = new ListNode(3);
  const linkNode2 = new ListNode(2,
    new ListNode(0,
      linkNodeEnd
    )
  );

  linkNode.next = linkNodeEnd.next = linkNode2;
  deepStrictEqual(detectCycle(linkNode), linkNode2);
});

test('Case 2', function() {
  const linkNodeEnd = new ListNode(2);
  const linkNode = new ListNode(1, linkNodeEnd);

  linkNodeEnd.next = linkNode;

  deepStrictEqual(detectCycle(linkNode), linkNode);
});

test('Case 3', function() {
  const linkNode = createLinkedList([1]);

  deepStrictEqual(detectCycle(linkNode), null);
});