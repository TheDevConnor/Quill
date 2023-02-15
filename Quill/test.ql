# Built in math functions

have user_input := input()
array my_array [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144] # fibonacci sequence

func async test_built_in_math_functions (i) {

	info(1, sin(i)) # sine
	info(2, cos(i)) # cosine
	info(3, tan(i)) # tangent

	info(21, sec(i)) # secant
	info(31, csc(i)) # cosecant
	info(11, cot(i)) # cotangent

	info(4, sqrt(i)) # square root
	info(5, abs(i)) # absolute value
	info(6, log(i)) # natural logarithm
	info(7, log10(i)) # base 10 logarithm

	info(8, add(i, 30)) # addition
	info(9, sub(i, 30)) # subtraction
	info(10, mul(i, 30)) # multiplication
	info(11, div(i, 30)) # division
	info(12, mod(i, 30)) # modulus

	info(13, floor(i)) # floor is used to round a number down to the nearest integer
	info(14, ceil(i)) # ceil is used to round a number up to the nearest integer
	info(15, min(i, 30)) # minimum
	info(16, max(i, 30)) # maximum
	info(17, pow(30, i)) # power {30^2} so 900

	info(18, mean(my_array)) # mean (average)
	info(19, median(my_array)) # median (middle number)
	info(20, mode(my_array)) # mode (most common number)

	info(21, push(my_array, 233)) # push (add to the end of an array)
	info(22, pop(my_array)) # pop (remove from the end of an array)
	info(23, length(my_array)) # length (get the length of an array)
	info(24, first(my_array)) # first (get the first element of an array)c
	info(25, last(my_array)) # last (get the last element of an array)
	info(26, nth(my_array, 3)) # nth (get the nth element of an array)
	info(27, indexOf(my_array, 144)) # index (get the index of an element in an array)
	info(28, pull(my_array, 144)) # pull (remove an element from an array)
	info(29, sumArray(my_array)) # sum (sum all the elements in an array)


	# TODO: date and time
	# TODO: (maybe) add a way to convert between different units of measurement
	# TODO: Finish strings
}

test_built_in_math_functions(user_input)
