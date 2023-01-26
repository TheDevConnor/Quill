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
CSPrint(foo + obj[complex.bar] + obj[x])
CSPrint(foo + obj.complex.bar + obj.x)
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
In Quill, you can define an array using the .. operator to specify the range of values. Here is an example of how you can define an array with values from 0 to 5:

Copy code
let myArray = [0, 1, 2, 3, 4, 5];
Alternatively, you can use the range operator and the map function to create an array with the desired values like so:

Copy code
let myArray = (0..5).map(i => i);
You can also use this syntax to define an array with a specific number of elements like this

Copy code
let myArray = [0; 6] //This will create an array of 6 elements, all with the value of 0
You can also use the range operator to create an array with a range of values and then use the map function to transform the array values like this

Copy code
let myArray = (0..5).map(i => i * 2); // This will create an array of [0, 2, 4, 6, 8, 10]
Please note that the way you define an array might differ depending on the version of Quill you are using and the context in which you are using it.
--------------------------------------------------------------------------------------------------------------------------------