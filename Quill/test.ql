have min_1 := Random(0, 10)
have max_1 := Random(0, 10)

func async test (min, max) {
	if min > max {
		have result := 0
		CSDebug(result)
	} elif min < max {
		have result := max - min
		CSWarn(result)
	} else {
		have result := min + (max - min)
		CSDebug(result)
	}
}

CSInfo(min_1, max_1)
test(min_1, max_1)

/* What I need to add to Quill
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