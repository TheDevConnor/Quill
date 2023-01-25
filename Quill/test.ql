func async random (min, max) {
	have result := Random(min, max)
	return result
}

const results := random(10, 20)

CSInfo(results)

/* What I need to add to Quill
Elif // Somewhat working needs improvement
For loop // Woking on now
While loop
Strings
Arrays
*/

/* Can do the same thing for a for loop */
/* 0..5 is the same as saying for i in range(0, 5) */
/*
for i in 0..5 {
    CSInfo("Hello Quill User");
} */

/* Can do the same thing for a while loop */
/*
let counter = 0
while counter < 5 {
	CSInfo("Hello Quill User");
	counter = counter + 1
} */