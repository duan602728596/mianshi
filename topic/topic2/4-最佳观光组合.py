import unittest
from typing import List

"""
给你一个正整数数组 values，其中 values[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的 距离 为 j - i。
一对景点（i < j）组成的观光组合的得分为 values[i] + values[j] + i - j ，也就是景点的评分之和 减去 它们两者之间的距离。
返回一对观光景点能取得的最高分。
"""


class Solution:
    def maxScoreSightseeingPair(self, values: List[int]) -> int:
        max_result = None
        length = len(values)
        i = 0

        while i < length:
            j = i + 1

            while j < length:
                result = values[i] + values[j] + i - j

                if not max_result or result > max_result:
                    max_result = result

                j += 1

            i += 1

        return max_result

    def maxScoreSightseeingPair2(self, values: List[int]) -> int:
        length = len(values)
        i = 1
        left_max_result = values[0]
        result = 0

        while i < length:
            result = max(left_max_result + values[i] - i, result)
            left_max_result = max(values[i] + i, left_max_result)
            i += 1

        return result


class TestCase(unittest.TestCase):
    def test_case_1(self):
        values = Solution().maxScoreSightseeingPair2([8, 1, 5, 2, 6])
        self.assertEqual(values, 11)

    def test_case_2(self):
        values = Solution().maxScoreSightseeingPair2([1, 2])
        self.assertEqual(values, 2)


if __name__ == '__main__':
    unittest.main()
