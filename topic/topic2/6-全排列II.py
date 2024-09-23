import unittest
from typing import List

"""
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
"""


class Solution:
    def get_next_array(self, nums: List[int], array: List[int], result:List[List[int]], max_len: int) -> None:
        if len(array) == max_len:
            result.append(array)
            return

        used = []

        for n in nums:
            if n not in used:
                new_array = array.copy()
                new_nums = nums.copy()
                used.append(n)
                new_array.append(n)
                new_nums.remove(n)
                self.get_next_array(new_nums, new_array, result, max_len)

    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        result: List[List[int]] = []
        used = []

        for n in nums:
            if n not in used:
                new_nums = nums.copy()
                new_nums.remove(n)
                used.append(n)
                self.get_next_array(new_nums, [n], result, len(nums))

        return result


class TestCase(unittest.TestCase):
    def test_case_1(self):
        values = Solution().permuteUnique([1, 1, 2])
        self.assertEqual(values, [[1, 1, 2], [1, 2, 1], [2, 1, 1]])


if __name__ == '__main__':
    unittest.main()
