import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
 * 字符 数值
 *  I   1
 *  V   5
 *  X   10
 *  L   50
 *  C   100
 *  D   500
 *  M   1000
 *
 * 例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。
 * 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。
 * 同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
 *   - I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
 *   - X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
 *   - C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
 * 给定一个罗马数字，将其转换成整数。
 */

const numMaps = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

function isLeftNum(item, nextItem) {
  if (
    (item === 'I' && (nextItem === 'V' || nextItem === 'X'))
    || (item === 'X' && (nextItem === 'L' || nextItem === 'C'))
    || (item === 'C' && (nextItem === 'D' || nextItem === 'M'))
  ) {
    return numMaps[nextItem] - numMaps[item];
  } else {
    return null;
  }
}

/**
 * @param { string } s
 * @return { number }
 */
function romanToInt(s) {
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const item = s[i];

    // 验证是否在左侧
    if (['I', 'X', 'C'].includes(item)) {
      const nextItem = s[i + 1];
      const leftNum = isLeftNum(item, nextItem);

      if (leftNum !== null) {
        result += leftNum;
        i++;
      } else {
        result += numMaps[item];
      }
    } else {
      result += numMaps[item];
    }
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(romanToInt('III'), 3);
});

test('Case 2', function() {
  deepStrictEqual(romanToInt('IV'), 4);
});

test('Case 3', function() {
  deepStrictEqual(romanToInt('LVIII'), 58);
});

test('Case 4', function() {
  deepStrictEqual(romanToInt('MCMXCIV'), 1994);
});