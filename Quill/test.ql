func random (min, max) {
	have result := Random(min, max);

	return result;
}

func add_2_numbers (a, b) {
	have result := a + b;

	return result;
}

const a := 10;

const add := add_2_numbers(10, 20);
CSPrint(add)

const results := random(10, 20);
CSPrint(results)
