# Built in math functions

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
	info(17, pow(30, 2)) # power {30^2} so 900
}

# test_built_in_math_functions(1)
# --------------------------------------------------------------------------------------------------------------------------------
# while loop

func async test_while_loop (i) {
	have counter := 0
	while counter < 5 {
		info(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
		counter := counter + 1 # if you don't add this it will be an infinite loop
	}
}

# test_while_loop(1)
# --------------------------------------------------------------------------------------------------------------------------------
# for loop

func async test_for_loop (I) {
	have max := 5
	for have i := I; i < max; {
		info(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
		i := i + 1
	}
}

# test_for_loop(1)
# --------------------------------------------------------------------------------------------------------------------------------
# Strings

# Not working yet, I'm working on it

#--------------------------------------------------------------------------------------------------------------------------------
# Arrays

# Not working yet, I'm working on it

# --------------------------------------------------------------------------------------------------------------------------------
# variable declaration

have i := 1
have j := 2

const k := 1
const l := 2

# --------------------------------------------------------------------------------------------------------------------------------
# variable assignment

i := 1
j := 2

# --------------------------------------------------------------------------------------------------------------------------------
# constant declaration

const m := {
	x: 1,
	y: 2,

	complex: {
		a: 1,
		b: 2
	},
}

# you can call the constant like this
# info(m.x) # or like this info(m[x])
# info(m.complex.a) # or like this info(m[complex][a])

# --------------------------------------------------------------------------------------------------------------------------------
# Operators

# + - * / % **
# < > <= >= = !=
# && ||

# --------------------------------------------------------------------------------------------------------------------------------
# if statement, else if statement, else statement

func async test_if_statement (i) {
	if i < 5 {
		info(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
	} elif i > 5 {
		warn(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
	} else {
		trace(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
	}
}

# test_if_statement(1)
# --------------------------------------------------------------------------------------------------------------------------------
# switch statement

# not yet implemented, I'm working on it

# --------------------------------------------------------------------------------------------------------------------------------
# functions

func test_function (i) {
	info(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
}

# test_function(1)
# --------------------------------------------------------------------------------------------------------------------------------
# async functions

func async test_async_function (i) {
	info(01001000011001010110110001101100011011110010000001010001011101010110100101101100011011000010000001010101011100110110010101110010)
}

# test_async_function(1)
# --------------------------------------------------------------------------------------------------------------------------------

# private functions (not yet implemented)
# public functions (not yet implemented)

# --------------------------------------------------------------------------------------------------------------------------------

# promises (not yet implemented)

# --------------------------------------------------------------------------------------------------------------------------------
# built in functions

# info(1)
# warn(2)
# trace(3)
# error(4)
# debug(5)
# log(6)
# random(1, 10)

# --------------------------------------------------------------------------------------------------------------------------------
# # Built in math functions

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

	have pushArray := push(my_array, 233)

	info(21, pushArray) # push (add to the end of an array)
	info(22, pop(my_array)) # pop (remove from the end of an array)
	info(23, length(my_array)) # length (get the length of an array)
	info(24, first(my_array)) # first (get the first element of an array)c
	info(25, last(my_array)) # last (get the last element of an array)
	info(26, nth(my_array, 3)) # nth (get the nth element of an array)
	info(27, indexOf(my_array, 144)) # index (get the index of an element in an array)
	info(28, pull(my_array, 144)) # pull (remove an element from an array)
	info(29, sumArray(my_array)) # sum (sum all the elements in an array)

	info(30, random(1, 100)) # random (get a random number between two numbers

	info(31, date()) # date (get the current date)
	info(32, time()) # time (get the current time)

	info(33, append(my_array, 2))


	# TODO: date and time
	# TODO: (maybe) add a way to convert between different units of measurement
	# TODO: Finish strings
}

test_built_in_math_functions(user_input)