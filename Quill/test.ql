func random (min, max) {
	have result := CSRandom(min, max);

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
