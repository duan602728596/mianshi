import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
 * 如果可以，返回 true ；否则返回 false 。
 * magazine 中的每个字符只能在 ransomNote 中使用一次。
 */

/**
 * 判断字符串是否在magazine中，返回index并删除
 * @param { string } str
 * @param { Array<string> } magazineArray
 */
function isStrInMagazine(str, magazineArray) {
  const index = magazineArray.indexOf(str);
  const inMagazine = index >= 0;

  if (inMagazine) {
    magazineArray.splice(index, 1);
  }

  return inMagazine;
}

/**
 * @param { string } ransomNote
 * @param { string } magazine
 * @return { boolean }
 */
function canConstruct(ransomNote, magazine) {
  const ransomNoteArray = ransomNote.split(''),
    magazineArray = magazine.split('');

  let result = true;

  for (let i = 0; i < ransomNoteArray.length; i++) {
    if (!isStrInMagazine(ransomNoteArray[i], magazineArray)) {
      result = false;
      break;
    }
  }

  return result;
}

test('Case 1', function() {
  deepStrictEqual(canConstruct('a', 'b'), false);
});

test('Case 2', function() {
  deepStrictEqual(canConstruct('aa', 'ab'), false);
});

test('Case 3', function() {
  deepStrictEqual(canConstruct('aa', 'aab'), true);
});