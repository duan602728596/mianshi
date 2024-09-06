/**
 * 链表
 * Definition for singly-linked list.
 */
export class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * 从数组创建链表
 * @param { Array<number> } arr
 */
export function createLinkedList(arr) {
  let result = null;

  for (let i = arr.length - 1; i >= 0; i--) {
    result = new ListNode(arr[i], result);
  }

  return result;
}

/**
 * 打印链表
 * @param { ListNode } head
 * @return { Array<number> }
 */
export function printLinkedList(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

/* 随机链表 */
export class RandomListNode {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = null;
  }
}

/**
 * 打印链表
 * @param { RandomListNode } head
 * @return { Array<number> }
 */
export function printRandomLinkedList(head) {
  const result = [];
  let current = head;

  while (current) {
    result.push([current.val, current.random?.val ?? null]);
    current = current.next;
  }

  return result;
}