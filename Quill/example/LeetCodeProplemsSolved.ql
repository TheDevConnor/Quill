# THESE ARE JUST THE SOLUTIONS WRITTEN IN QUILL!! THE SYNTAX MAY CHANGE IN THE FUTURE!!
# Some of the solutions do not work because of some features that are not implemented yet.
# I will update this file as I add more features to the language.

# TODO::This is a example from a leetcode problem. Written in quill.
# Given an array of integers nums and an integer target, return 
# indices of the two numbers such that they add up to target.
# You may assume that each input would have exactly one solution, 
# and you may not use the same element twice.
# You can return the answer in any order.

# Example 1:

# Input: nums = [2,7,11,15], target = 9
# Output: [0,1]
# Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
# Example 2:

# Input: nums = [3,2,4], target = 6
# Output: [1,2]
# Example 3:

# Input: nums = [3,3], target = 6
# Output: [0,1]

# Constraints:

# 2 <= nums.length <= 103
# -109 <= nums[i] <= 109
# -109 <= target <= 109
# Only one valid answer exists.

func twoSum (nums: array[], target: int) {
	# This for loop will run as long as the condition i > min is true.
	for have i := 0; i < nums.length; {
		# If this condition is true, then the function of info
		# (a built in function to print to the console) will be called.
		if nums[i] + nums[i + 1] = target {
			info(i)
		} else {
			# If the condition is false, then the function of debug
			# (a built in function to print to the console) will be called.
			debug(i)
		}
	}

	# Then we need to iterate through the loop. You
	# can do this at the beginning of the for loop or at the end.
	i := i + 1
}
