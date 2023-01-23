func test_1 (x ,y) {
    if (x = y) {
        return x;
		CSError(x)
    } else {
        return y;
		CSError(y)
    }
}

have x_ := test_1(2, 3);
have y_ := test_1(2, 1);


/* What I need to add to Quill
Strings
Arrays
Elif
For loop
While loop
*/