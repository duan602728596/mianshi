import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';
import { RandomListNode, printRandomLinkedList } from '../../struct/LinkedList.mjs';

/**
 * 给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。
 *
 * 构造这个链表的 深拷贝。 深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点 。
 *
 * 例如，如果原链表中有 X 和 Y 两个节点，其中 X.random --> Y 。那么在复制链表中对应的两个节点 x 和 y ，同样有 x.random --> y 。
 *
 * 返回复制链表的头节点。
 *
 * 用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
 *
 * val：一个表示 Node.val 的整数。
 * random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
 * 你的代码 只 接受原链表的头节点 head 作为传入参数。
 */

/**
 * @param { RandomListNode } head
 * @return { RandomListNode }
 */
function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();
  let current = head;
  let returnCurrent = new RandomListNode(head.val);
  const result = returnCurrent;

  map.set(current, returnCurrent);

  while (current) {
    // 先创建random
    if (current.random) {
      const r = map.get(current.random);

      if (r) {
        returnCurrent.random = r;
      } else {
        returnCurrent.random = new RandomListNode(current.random.val);
        map.set(current.random, returnCurrent.random);
      }
    }

    // 再创建next
    const nextNode = map.get(current.next);

    if (nextNode) {
      returnCurrent.next = nextNode;
    } else if (current.next) {
      returnCurrent.next = new RandomListNode(current.next.val);
      map.set(current.next, returnCurrent.next);
    }

    current = current.next;
    returnCurrent = returnCurrent.next;
  }

  return result;
}

test('Case 1', function() {
  const n1 = new RandomListNode(7);
  const n2 = new RandomListNode(13);
  const n3 = new RandomListNode(11);
  const n4 = new RandomListNode(10);
  const n5 = new RandomListNode(1);

  n1.next = n2;
  n2.next = n3;
  n3.next = n4;
  n4.next = n5;

  n1.random = null;
  n2.random = n1;
  n3.random = n5;
  n4.random = n3;
  n5.random = n1;

  deepStrictEqual(printRandomLinkedList(copyRandomList(n1)), [[7, null], [13, 7], [11, 1], [10, 11], [1, 7]]);
});

test('Case 2', function() {
  const n1 = new RandomListNode(1);
  const n2 = new RandomListNode(2);

  n1.next = n2;

  n1.random = n2;
  n2.random = n2;

  deepStrictEqual(printRandomLinkedList(copyRandomList(n1)), [[1, 2], [2, 2]]);
});

test('Case 3', function() {
  const n1 = new RandomListNode(3);
  const n2 = new RandomListNode(3);
  const n3 = new RandomListNode(3);

  n1.next = n2;
  n2.next = n3;

  n1.random = null;
  n2.random = n1;
  n3.random = null;

  deepStrictEqual(printRandomLinkedList(copyRandomList(n1)), [[3, null], [3, 3], [3, null]]);
});