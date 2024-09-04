import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { ListNode, createLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 *
 * 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
 * 注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
 *
 * 如果链表中存在环 ，则返回 true 。 否则，返回 false 。
 */

/**
 * @param { ListNode } head
 * @return { boolean }
 */
function hasCycle(head) {
  const set = new Set();
  let current = head;
  let result = false;

  while (current) {
    // 如果已经存在则说明有环
    if (set.has(current)) {
      result = true;
      break;
    }

    // 不是环
    if (current.next === null) {
      break;
    }

    set.add(current);
    current = current.next;
  }

  return result;
}

test('Case 1', function() {
  const linkNodeEnd = new ListNode(-4);
  const linkNode = new ListNode(3,
    new ListNode(2,
      new ListNode(0,
        linkNodeEnd
      )
    )
  );

  linkNodeEnd.next = linkNode;

  deepStrictEqual(hasCycle(linkNode), true);
});

test('Case 2', function() {
  const linkNodeEnd = new ListNode(2);
  const linkNode = new ListNode(1, linkNodeEnd);

  linkNodeEnd.next = linkNode;

  deepStrictEqual(hasCycle(linkNode), true);
});

test('Case 3', function() {
  deepStrictEqual(hasCycle(createLinkedList([1, 2, 3])), false);
});