func random (min, max) {
	have result := Random(min, max);

	/* TODO: add a return type to the result */
	return result;
}

have results := random(10, 20);

CSPrint(results)
