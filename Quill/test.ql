func test_1 (x ,y) {
    if (x > y) {
        x
		CSError(x)
    } else {
        y
		CSError(y)
    }
}

const x_ := test_1(2, 3);
const y_ := test_1(2, 1);
