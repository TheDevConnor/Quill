func random (min, max) {
	have result := CSRandom(min, max);

<<<<<<< HEAD
	return result
=======
	result
>>>>>>> parent of 4d4bf41 (added a return type!)
}

func add_2_numbers (a, b) {
	have result := a + b;

<<<<<<< HEAD
	return result
=======
	result
>>>>>>> parent of 4d4bf41 (added a return type!)
}

const a := 10;

const add := add_2_numbers(10, 20);
CSPrint(add)

const results := random(10, 20);
CSPrint(results)
