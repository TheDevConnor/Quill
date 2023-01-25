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