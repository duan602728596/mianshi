import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 有 n 个人前来排队买票，其中第 0 人站在队伍 最前方 ，第 (n - 1) 人站在队伍 最后方 。
 * 给你一个下标从 0 开始的整数数组 tickets ，数组长度为 n ，其中第 i 人想要购买的票数为 tickets[i] 。
 * 每个人买票都需要用掉 恰好 1 秒 。一个人 一次只能买一张票 ，如果需要购买更多票，他必须走到  队尾 重新排队（瞬间 发生，不计时间）。如果一个人没有剩下需要买的票，那他将会 离开 队伍。
 * 返回位于位置 k（下标从 0 开始）的人完成买票需要的时间（以秒为单位）
 */

/* <= n, tickets[i], >n tickets[i] - 1 */
function timeRequiredToBuy(tickets: Array<number>, k: number): number {
  let seconds: number = 0;

  for (let i: number = 0, N: number = tickets[k], P: number = N - 1; i < tickets.length; i++) {
    if (i <= k) {
      seconds += Math.min(N, tickets[i]); // 找最小值
    } else {
      seconds += Math.min(P, tickets[i]); // 最后一轮N后面的不需要找
    }
  }

  return seconds;
}

test('Case 1', function(): void {
  deepStrictEqual(timeRequiredToBuy([2, 3, 2], 2), 6);
});

test('Case 2', function(): void {
  deepStrictEqual(timeRequiredToBuy([5, 1, 1, 1], 0), 8);
});