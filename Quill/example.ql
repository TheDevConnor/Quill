const math :=  {

	func add_2_numbers (a => i32, b => i32) => i32 {
		return a + b
	},

	func sub_2_numbers (a => i32, b => i32) => i32 {
		return a - b
	}.

	func mul_2_numbers (a, b) {
		return a * b
	},
};

have sum_1 => i32 := math.add_2_numbers(10, 5);
have sum_2 => i32 := math.sub_2_numbers(10, 5);
have sum_3 => i32 := math.mul_2_numbers(10, 5);

have sum_1 => i32 := math[add_2_numbers(10, 5)];
have sum_2 => i32 := math[sub_2_numbers(10, 5)];
have sum_3 => i32 := math[mul_2_numbers(10, 5)];

CSPrint(sum_1, sum_2, sum_3);
--------------------------------------------------------------------------------------------------------------------------------
const objects := {
	x: 10,
	y: 20,
	foo,
};
--------------------------------------------------------------------------------------------------------------------------------
module rand {
    /* Declare a function of type rand that takes 1 parameter of type i32 (i32 is an int) and returns a value of type i32 (i32 is an int) */
    func rand(max => i32) => i32 {
            /* Declare a variable of type i32 and initialize it with a random number between 0 and max */
            /* The % operator is the modulo operator */
            /* The modulo operator returns the remainder of a division */
            /* For example, 10 % 3 = 1 */
            have n := rand() % max;
            return n
    },
};

/* Declare a variable of type i32 and initialize it with a random number between 0 and 10 */
have n := rand.rand(10);

/* Print the value of n to the console */
console.print(n)

have foo := 50 / 2;
--------------------------------------------------------------------------------------------------------------------------------
have foo := 50 / 2;

const obj := {
	x: 100,
	y: 200,
	foo,

	complex: {
		bar: 300,
		baz: 400,
	},
};
CSPrint(foo + obj[complex.bar] + obj[x])
CSPrint(foo + obj.complex.bar + obj.x)
--------------------------------------------------------------------------------------------------------------------------------
have f := 5 * 2;
f := f / 4 + 5

CSPrint(f, 45)
--------------------------------------------------------------------------------------------------------------------------------
