import unittest
from typing import List

"""
给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。

candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

对于给定的输入，保证和为 target 的不同组合数少于 150 个。

TODO: 未完成
"""


class Solution:
    def is_same_item(self, a: List[int], b: List[int]) -> bool:
        if len(a) != len(b):
            return False

        cache_map = {}
        i = 0
        r = True

        while i < len(a):
            if a[i] not in cache_map:
                cache_map[a[i]] = 0

            if b[i] not in cache_map:
                cache_map[b[i]] = 0

            cache_map[a[i]] += 1
            cache_map[b[i]] -= 1
            i += 1

        for k in cache_map:
            if cache_map[k] != 0:
                r = False
                break

            return r

    # 判断组合内是否有相同的数组
    def is_same(self, result: List[List[int]], item: List[int]) -> bool:
        same = False

        for a in result:
            # 对比a和item是否相同
            if self.is_same_item(a, item):
                same = True
                break

        return same

    # 循环判断是否可以组合
    def combination_array(self, candidates: List[int], target: int, result_array: List[int], sum_number: int, result: List[List[int]]) -> None:
        if sum_number > target:
            return

        if sum_number == target and not self.is_same(result, result_array):
            return result.append(result_array)

        for candidate in candidates:
            new_result_array = result_array.copy()
            new_result_array.append(candidate)
            self.combination_array(candidates, target, new_result_array, sum_number + candidate, result)

    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        result: List[List[int]] = []

        for candidate in candidates:
            self.combination_array(candidates, target, [candidate], candidate, result)

        return result


class TestCase(unittest.TestCase):
    def test_case_1(self):
        values = Solution().combinationSum([2, 3, 6, 7], 7)
        self.assertEqual(values, [[2, 2, 3], [7]])

    def test_case_2(self):
        values = Solution().combinationSum([2, 3, 5], 8)
        self.assertEqual(values, [[2, 2, 2, 2], [2, 3, 3], [3, 5]])

    def test_case_3(self):
        values = Solution().combinationSum([2], 1)
        self.assertEqual(values, [])

    def test_case_4(self):
        values = Solution().combinationSum([3, 5, 7], 10)
        self.assertEqual(values, [[3, 7], [5, 5]])


if __name__ == '__main__':
    unittest.main()
