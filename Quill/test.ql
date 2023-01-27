
have min_1 := Random(0, 10)
have max_1 := Random(0, 10)

have my_array := [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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

/* This is how you will assign an array in quill

have array := (0..5).map(i -> 1)

/* Can do the same thing for a for loop */

/*
have i := 0
have max := 5

for i in 0..5 {
    CSInfo(max);
} */

/* Can do the same thing for a while loop */
/*
have counter := 0
while counter < 5 {
	CSInfo("Hello Quill User");
	counter := counter + 1
} */