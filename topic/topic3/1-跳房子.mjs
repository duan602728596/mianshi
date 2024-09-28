/**
 * 跳房子，规定总共有n个格子，每次可以选择跳1个格子、2个格子或3个格子，但是下一步不能和当前选择的跳跃距离一样，
 * 计算总共有多少种跳房子方案。
 */

/**
 * @param { number } n
 * @return { number }
 */
function jump(n) {
  if (n === 0) return 0;

  if (n < 3) return 1;

  const cache = {
    '-1': [0, 0, 0],
    0: [1, 1, 1],
    1: [0, 1, 1]
  };

  for (let i = 2; i < n; i++) {
    const [c0, c1, c2] = [
      cache[i - 1][0],
      cache[i - 2][1],
      cache[i - 3][2]
    ];

    cache[i] = [
      c1 + c2, // <del>0</del>, 1, 2
      c0 + c2, // 0, <del>1</del>, 2
      c0 + c1  // 0, 1, <del>2</del>
    ];
  }

  return cache[n - 1][0] + cache[n - 2][1] + cache[n - 3][2];
}

for (let i = 1; i < 100; i++) {
  console.log(`${ i }:`, jump(i));
}