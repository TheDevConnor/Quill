/* This is a script writen in quill to test what we have so far. 
Also still need to add in strings as well as finish adding in arrays, and fix
constructors. Also need to add support for decimals as well as negative numbers*/

# you can define comments using the # symbol. or you can use /* */ to define a comment.

# this is a variable declaration. it is a variable that is named "min_1" and it is a number.
have min_1 := 10
# this is a variable declaration. it is a variable that is named "max_1" and it is a number.
have max_1 := 10

# there is also a built in random function that can be used to generate a random number.
# You can call the random function by saying random() then passing your parameters.
have random_number := random(1, 100)

# you can also take in the user input as well. By using the built in function of input.
# have user_input := input()

# This is a function that is named "while_loop_test" and it takes in two parameters, "min" and "max".
# and will test the while loop.
func async while_loop_test (min, max){
	# The while loop will run as long as the condition min_1 <= max_1 is true
	while min <= max {
		# This function will warn the user when the condition is true.
		warn(min)
		# The value of min_1 is increased by 1
		min := min + 1
	}
}

# This is a function that is named "for_loop_test" and it takes in two parameters, "min" and "max".
# and will test the for loop.
func async for_loop_test (min) {
	# This for loop will run as long as the condition i > min is true.
	for have i := 200; i > min; {
		# If this condition is true, then the function of info (a built in function to print to the console) will be called.
		if i > min {
			info(i)
		} else {
			# If the condition is false, then the function of debug (a built in function to print to the console) will be called.
			debug(i)
		}

		# Then we need to iterate through the loop. You can do this at the beginning of the for loop or at the end.
		i := i - 1
	}
}

# This is a function that ius named "Test" and it takes in two parameters, "min" and "max".
func test (min, max) {
	# If "min" is greater than "max", then calculate the result as 0.
	if min > max {
		have result := 0
		# Print the result using the CSDebug function.
		debug(result)
	} 
  
	# If "min" is less than "max", then calculate the result as the difference between "max" and "min".
	if min < max {
		have result := max - min
		
		# Print the result using the CSWarn function.
		warn(result)
	} 

	# If "min" is eqaul to the "max", then print the result using the CSInfo function.
	elif min = max {
		have result := min + (max * min)

		# Print the result using the CSInfo function.
		info(result)
	}
  
	# If "min" is equal to "max", then calculate the result as the sum of "min" and the difference between "max" and "min".
	else {
		have result := min + (max - min)
		
		# Print the result using the CSTrace function.
		trace(result)
	}
}

# lets test the user input. When the input is received it will be multiplied by 2 but then add 100.
# have user_input_result := (user_input * 2) + 100
# info(user_input_result)

# Now lets test the while_loop_test function.
# while_loop_test(user_input, 100) # This will print out 0 up to 10.

# Now lets test the for_loop_test function.
# info(random_number)
# for_loop_test(random_number) # This will print out 10 down to 0.

# Now lets test the test function.
# test(10, 0) # This will print out 0. because we set the result to 0.
# test(0, 10) # This will print out 10. because 10 - 0 = 10.
# test(10, 10) # This will print out 110. because 10 + (10 * 10) = 110.

# Lets add in an array.
# array test_array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# debug(test_array) # This will print out 1.



# this is a fizz buzz example. Written in quill.
func async fizz_buzz (min, max) {
	# This for loop will run as long as the condition i > min is true.
	for have i := min; i < max; {
		# If this condition is true, then the function of info (a built in function to print to the console) will be called.
		if i % 3 = 0 {
			info(100)
		} elif i % 5 = 0 {
			info(200)
		} elif i % 3 = 0 && i % 5 = 0 {
			info(300)
		} else {
			# If the condition is false, then the function of debug (a built in function to print to the console) will be called.
			debug(i)
		}

		# Then we need to iterate through the loop. You can do this at the beginning of the for loop or at the end.
		i := i + 1
	}
}

# Now lets test the fizz_buzz function.
fizz_buzz(1, 100) # This will print out 1.