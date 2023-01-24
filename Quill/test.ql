func test_1 (x ,y) {
    if (x = y) {
		CSError(x)
        return x
    } elif (x < y) {
		CSInfo(x)
        return x
    }
}
test_1(1, 2)

/* What I need to add to Quill
Elif // Somewhat working needs improvement
For loop // Woking on now
While loop
Strings
Arrays
*/