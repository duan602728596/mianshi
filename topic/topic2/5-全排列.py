import unittest
from typing import List

"""
给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
"""


class Solution:
    def array_some(self, array: List[int], value: int) -> bool:
        has_result = False

        for a in array:
            if a == value:
                has_result = True
                break

        return has_result

    def get_next_array(self, nums: List[int], array: List[int], result: List[List[int]]) -> None:
        if len(array) == len(nums):
            result.append(array)
            return

        for n in nums:
            if not self.array_some(array, n):
                new_array = array.copy()
                new_array.append(n)
                self.get_next_array(nums, new_array, result)

    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        for n in nums:
            self.get_next_array(nums, [n], result)

        return result


class TestCase(unittest.TestCase):
    def test_case_1(self):
        values = Solution().permute([1, 2, 3])
        self.assertEqual(values, [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]])


if __name__ == '__main__':
    unittest.main()
