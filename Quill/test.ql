func test_1 (x ,y) {
    if (x = y) {
        return x
		CSError(x)
    } elif (x < y) {
        return x
		CSInfo(x)
    }
}
test_1(1, 2)

/* What I need to add to Quill
Elif // Working on now
For loop
While loop
Strings
Arrays
*/