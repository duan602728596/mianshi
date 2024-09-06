import test from 'node:test';
import { deepStrictEqual } from 'node:assert/strict';

/**
 * 给你一个字符串 path ，表示指向某一文件或目录的 Unix 风格 绝对路径 （以 '/' 开头），请你将其转化为 更加简洁的规范路径。
 *
 * 在 Unix 风格的文件系统中规则如下：
 *
 * 一个点 '.' 表示当前目录本身。
 * 此外，两个点 '..' 表示将目录切换到上一级（指向父目录）。
 * 任意多个连续的斜杠（即，'//' 或 '///'）都被视为单个斜杠 '/'。
 * 任何其他格式的点（例如，'...' 或 '....'）均被视为有效的文件/目录名称。
 * 返回的 简化路径 必须遵循下述格式：
 *
 * 始终以斜杠 '/' 开头。
 * 两个目录名之间必须只有一个斜杠 '/' 。
 * 最后一个目录名（如果存在）不能 以 '/' 结尾。
 * 此外，路径仅包含从根目录到目标文件或目录的路径上的目录（即，不含 '.' 或 '..'）。
 * 返回简化后得到的 规范路径 。
 */

/**
 * @param { string } path
 * @return { string }
 */
function simplifyPath(path) {
  const pathArray = path.split(/\//g);
  const newArray = [];

  for (let i = 1; i < pathArray.length; i++) {
    const item = pathArray[i];

    if (item === '..') {
      newArray.pop();
    } else if (item !== '.' && item !== '') {
      newArray.push(item);
    }
  }

  return `/${ newArray.join('/') }`;
}

test('Case 1', function() {
  deepStrictEqual(simplifyPath('/home/'), '/home');
});

test('Case 2', function() {
  deepStrictEqual(simplifyPath('/../'), '/');
});

test('Case 3', function() {
  deepStrictEqual(simplifyPath('/home/user/Documents/../Pictures'), '/home/user/Pictures');
});

test('Case 4', function() {
  deepStrictEqual(simplifyPath('/../'), '/');
});

test('Case 5', function() {
  deepStrictEqual(simplifyPath('/.../a/../b/c/../d/./'), '/.../b/d');
});