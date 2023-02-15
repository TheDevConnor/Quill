--------------------------------------------------------------------------------------------------------------------------------
have foo := 50 / 2;

const obj := {
	x: 100,
	y: 200,
	foo,

	complex: {
		bar: 300,
		baz: 400,
	},
};
info(foo + obj[complex][bar] + obj[x])
info(foo + obj.complex.bar + obj.x)
--------------------------------------------------------------------------------------------------------------------------------
have f := 5 * 2;
f := f / 4 + 5

CSPrint(f, 45)
--------------------------------------------------------------------------------------------------------------------------------
func random (min, max) {
	have result := Random(min, max);

	result
}

func add_2_numbers (a, b) {
	have result := a + b;

	result
}

const add := add_2_numbers(10, 20);
CSPrint(add)

const results := random(10, 20);
CSPrint(results)
--------------------------------------------------------------------------------------------------------------------------------
func random (min, max) {
	have result := Random(min, max);

	/* TODO: add a return type to the result */
	return result;
}

const results := random(10, 20);

CSPrint(results)
--------------------------------------------------------------------------------------------------------------------------------
func async random (min, max) {
	have result := Random(min, max)
	return result
}

const results := random(10, 20)

CSInfo(results)
--------------------------------------------------------------------------------------------------------------------------------
func async test (min, max) {
	have random := Random(min, max)

	if min < max {
		have result := 0
		CSError(result)
	} else {
		have result := min + (max - min)
		CSError(result)
	}
}

test(0, 5)
--------------------------------------------------------------------------------------------------------------------------------
Sure, in Quill you can define an array by using the have keyword, followed by the name of the array, then the size of the array in square brackets, and then the := operator to assign the values of the array. Here is an example of how you can define an array with 5 elements in Quill:

Copy code
have myArray[5] := {1, 2, 3, 4, 5};
You can also define an array and initialize it with zero value like this

Copy code
have myArray[5] := {0; 5};
--------------------------------------------------------------------------------------------------------------------------------
/* What I need to add to Quill
For loop // Woking on now
While loop
Strings
Arrays */

/* This is how you will assign an array in quill

have myArray := array[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

*/

/* Can do the same thing for a for loop

have i := 0
have max := 5

for i in 0..5 {
    CSInfo(max);
} */

/* Can do the same thing for a while loop */
/*
have counter := 0
while counter < 5 {
	CSInfo("Hello Quill User");
	counter := counter + 1
} */
--------------------------------------------------------------------------------------------------------------------------------
# Built in math functions
func async test_built_in_functions (i) {

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

test_built_in_functions(1)
--------------------------------------------------------------------------------------------------------------------------------