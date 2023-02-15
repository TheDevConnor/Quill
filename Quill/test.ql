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

test_built_in_math_functions(1)
