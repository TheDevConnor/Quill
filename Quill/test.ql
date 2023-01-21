/* have x := 1;

const math := {
	add: {
		y: x + 1,
	},
	sub: {
		z: x - 1,
	},
};

have number := math[add.y];
CSPrint(number) */

/* have x := 1;
CSPrint(x) */

/* func random (min, max) {
	have result := Random(min, max);

	return result;
}

func add_2_numbers (a, b) {
	have result := a + b;

	return result;
}

const add := add_2_numbers(10, 20);
CSPrint(add)

const results := random(10, 20);
CSPrint(results) */

have x := 1;

if (x < 10) {
	CSPrint(1000)
};
