have f := 5 * 2;
f := f / 4 + 5

/* The Most random comment ever */

CSPrint(f, 45)

/* Will get the time */

const time := CSGetTime();
CSPrint(time, 45)

/* Will get a random number between two given numbers */

have random := CSRandom(1, 100);
CSPrint(random, 45)

/* User defined functions */

function async add(a, b) {
	have c := a + b;

	return c;
}
