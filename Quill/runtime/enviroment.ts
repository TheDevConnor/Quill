// deno-lint-ignore-file
import {
	MK_BOOL,
	MK_NATIVE_FUNCTION,
	MK_NULL,
	MK_NUMBER,
	MK_ARRAY,
	MK_STRING,
	RuntimeVal,
	MK_STATIC_BUILTIN_HANDLER,
	StringVal,
} from "./values.ts";
import {
	info,
	warn,
	error,
	trace,
	format,
	debug,
} from "../util/tracing.ts";

import {
	stringLookUpTable,
	numberLookUpTable,
	arrayLookUpTable,
	booleanLookUpTable,
} from "./eval/expressions.ts";

function arg_formatter(args: RuntimeVal[]): any[] {
	let res = [];
	for(let arg of args) {
		if(arg.type === "array") {
			for(let val of arg.value) {
				res.push(val["value"]);
			}
		} else {
			res.push(arg.value);
		}
	}
	return res;
}

export function createGlobalENV() {
	const env = new Enviroment();
	// Create Default Global Enviroment
	env.declareVar("false", MK_BOOL(false), true);
	env.declareVar("true", MK_BOOL(true), true);
	env.declareVar("?", MK_NULL(), true);

	// Define a native built in function
	// A custom print function that only prints the value
	env.declareVar(
		"info",
		MK_NATIVE_FUNCTION((args, _scope) => {
			const res = arg_formatter(args);
			info(format(true, res.join(" ")));
			return MK_NULL();
		}),
		true
	);

	env.declareVar(
		"trace",
		MK_NATIVE_FUNCTION((args, _scope) => {
			const res = arg_formatter(args);
			trace(format(true, res));
			return MK_NULL();
		}),
		true
	);

	env.declareVar(
		"debug",
		MK_NATIVE_FUNCTION((args, _scope) => {
			const res = arg_formatter(args);
			debug(format(true, res));
			return MK_NULL();
		}),
		true
	);

	env.declareVar(
		"warn",
		MK_NATIVE_FUNCTION((args, _scope) => {
			const res = arg_formatter(args);
			warn(format(true, res.join(" ")));
			return MK_NULL();
		}),
		true
	);

	env.declareVar(
		"error",
		MK_NATIVE_FUNCTION((args, _scope) => {
			const res = arg_formatter(args);
			error(format(true, res.join(" ")));
			return MK_NULL();
		}),
		true
	);

	env.declareVar(
		"input",
		MK_NATIVE_FUNCTION((args, _scope) => {
			const input = prompt(format(true, args));
			return input ? MK_NUMBER(Number(input)) : MK_NULL();
		}),
		true
	);

	builtInNativeFunctions(env);
	builtInStringFunctions();
	builtInArrayFunctions(env);
	builtInMathFunctions(env);

	// TODO: a built in function that handles graphics
	// TODO: a built in function that handles sound
	// TODO: a built in function that handles sockets
	// TODO: a built in function that handles importing files

	return env;
}

function builtInNativeFunctions(env: Enviroment) {
	// A built in break function that will break out of a loop
	function breakFunction(_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		throw "break";
	}
	// a built in function for null values
	function nullFunction(_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		return MK_NULL();
	}
	// A built in function to get the date
	function dateFunction(_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		return MK_NUMBER(new Date().getDate());
	}
	// A built in function to get the time
	function timeFunction(_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		return MK_NUMBER(new Date().getTime());
	}

	env.declareVar("date", MK_NATIVE_FUNCTION(dateFunction), true);
	env.declareVar("time", MK_NATIVE_FUNCTION(timeFunction), true);
	env.declareVar("break", MK_NATIVE_FUNCTION(breakFunction), true);
	env.declareVar("null", MK_NATIVE_FUNCTION(nullFunction), true);
}

function builtInStringFunctions() {
	function lengthOfaString(string: StringVal): RuntimeVal {
		return MK_NUMBER(string.value.length);
	}
	stringLookUpTable.set("len", MK_STATIC_BUILTIN_HANDLER(lengthOfaString));

	function toUpperCase(string: StringVal): RuntimeVal {
		return MK_STRING(string.value.toUpperCase());
	}
	stringLookUpTable.set("upper", MK_STATIC_BUILTIN_HANDLER(toUpperCase));

	function toLowerCase(string: StringVal): RuntimeVal {
		return MK_STRING(string.value.toLowerCase())
	}
	stringLookUpTable.set("lower", MK_STATIC_BUILTIN_HANDLER(toLowerCase));

}

function builtInArrayFunctions(env: Enviroment) {
	// A buitl in function to push a value to an array
	function pushFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Push function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "array") {
			throw "Push function takes an array and a value";
		}

		return MK_ARRAY(arg1.value.concat(arg2));
	}
	// A built in function to pop a value from an array
	function popFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Pop function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Pop function takes an array";
		}

		if (arg.value.length === 0) {
			throw "Pop function takes an array with at least one element";
		}

		return MK_ARRAY(arg.value.slice(0, -1));
	}
	// A built in function to get the length of an array
	function lengthFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Length function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Length function takes an array";
		}

		return MK_NUMBER(arg.value.length);
	}
	// A built in function to get the first element of an array
	function firstFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "First function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "First function takes an array";
		}

		if (arg.value.length === 0) {
			throw "First function takes an array with at least one element";
		}

		return arg.value[0];
	}
	// A built in function to get the last element of an array
	function lastFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Last function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Last function takes an array";
		}

		if (arg.value.length === 0) {
			throw "Last function takes an array with at least one element";
		}

		return arg.value[arg.value.length - 1];
	}
	// A built in function to get the nth element of an array
	function nthFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Nth function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "array") {
			throw "Nth function takes an array and a number";
		}

		if (arg2.type !== "number") {
			throw "Nth function takes an array and a number";
		}

		if (arg1.value.length === 0) {
			throw "Nth function takes an array with at least one element";
		}

		if (arg2.value < 0 || arg2.value >= arg1.value.length) {
			throw "Nth function takes a number in the range of the array";
		}

		return arg1.value[arg2.value];
	}
	// A built in function to get the index of an element in an array
	function indexOfFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Index of function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "array") {
			throw "Index of function takes an array and a value";
		}

		if (arg1.value.length === 0) {
			throw "Index of function takes an array with at least one element";
		}

		const index = arg1.value.findIndex((v: { value: any; }) => v.value === arg2.value);

		if (index === -1) {
			throw "Index of function takes a value that is in the array";
		}

		return MK_NUMBER(index);
	}
	// A built in function that pulls from an array
	function pullFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Pull function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "array") {
			throw "Pull function takes an array and a value";
		}

		if (arg1.value.length === 0) {
			throw "Pull function takes an array with at least one element";
		}

		const index = arg1.value.findIndex((v: { value: any; }) => v.value === arg2.value);

		if (index === -1) {
			throw "Pull function takes a value that is in the array";
		}

		return MK_ARRAY(arg1.value.slice(0, index).concat(arg1.value.slice(index + 1)));
	}
	// A built in function to get the sum of an array
	function sumFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Sum function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Sum function takes an array";
		}

		if (arg.value.length === 0) {
			throw "Sum function takes an array with at least one element";
		}

		return MK_NUMBER(arg.value.reduce((acc: number, v: { value: number; }) => acc + v.value, 0));
	}
	// A built in function that will handle appending to an array
	function appendFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Append function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "array") {
			throw "Append function takes an array and a value";
		}

		return MK_ARRAY(arg1.value.concat(arg2));
	}

	env.declareVar("push", MK_NATIVE_FUNCTION(pushFunction), true);
	env.declareVar("pop", MK_NATIVE_FUNCTION(popFunction), true);
	env.declareVar("pull", MK_NATIVE_FUNCTION(pullFunction), true);
	env.declareVar("length", MK_NATIVE_FUNCTION(lengthFunction), true);
	env.declareVar("first", MK_NATIVE_FUNCTION(firstFunction), true);
	env.declareVar("last", MK_NATIVE_FUNCTION(lastFunction), true);
	env.declareVar("nth", MK_NATIVE_FUNCTION(nthFunction), true);
	env.declareVar("indexOf", MK_NATIVE_FUNCTION(indexOfFunction), true);
	env.declareVar("sumArray", MK_NATIVE_FUNCTION(sumFunction), true);
	env.declareVar("append", MK_NATIVE_FUNCTION(appendFunction), true);
}

function builtInMathFunctions(env: Enviroment) {
	function radToDegFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Rad to deg function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Rad to deg function takes a number";
		}

		return MK_NUMBER(arg.value * (180 / Math.PI));
	}
	// A built in function to convert degrees to radians
	function degToRadFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Deg to rad function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Deg to rad function takes a number";
		}

		return MK_NUMBER(arg.value * (Math.PI / 180));
	}
	// A built in function to define a number as a degree
	function degFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Deg function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Deg function takes a number";
		}

		return MK_NUMBER(arg.value * (Math.PI / 180));
	}
	// Pi
	function piFunction(_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		return MK_NUMBER(Math.PI);
	}
	// A built in function that handles addition and can take in either one or two arguments
	function addFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length === 0) {
			throw "Add function takes at least one argument";
		}

		if (args.length === 1) {
			const [arg] = args;

			if (arg.type !== "number") {
				throw "Add function takes one number";
			}

			return MK_NUMBER(arg.value);
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Add function takes two numbers";
		}

		return MK_NUMBER(arg1.value + arg2.value);
	}
	// A built in function that handles subtraction and can take in either one or two arguments
	function subFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length === 0) {
			throw "Sub function takes at least one argument";
		}

		if (args.length === 1) {
			const [arg] = args;

			if (arg.type !== "number") {
				throw "Sub function takes one number";
			}

			return MK_NUMBER(-arg.value);
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Sub function takes two numbers";
		}

		return MK_NUMBER(arg1.value - arg2.value);
	}
	// A built in function that handles multiplication and can take in either one or two arguments
	function mulFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length === 0) {
			throw "Mul function takes at least one argument";
		}

		if (args.length === 1) {
			const [arg] = args;

			if (arg.type !== "number") {
				throw "Mul function takes one number";
			}

			return MK_NUMBER(arg.value);
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Mul function takes two numbers";
		}

		return MK_NUMBER(arg1.value * arg2.value);
	}
	// A built in function that handles division and can take in either one or two arguments
	function divFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length === 0) {
			throw "Div function takes at least one argument";
		}

		if (args.length === 1) {
			const [arg] = args;

			if (arg.type !== "number") {
				throw "Div function takes one number";
			}

			return MK_NUMBER(1 / arg.value);
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Div function takes two numbers";
		}

		return MK_NUMBER(arg1.value / arg2.value);
	}
	// A built in function that handles modulo and can take in either one or two arguments
	function modFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length === 0) {
			throw "Mod function takes at least one argument";
		}

		if (args.length === 1) {
			const [arg] = args;

			if (arg.type !== "number") {
				throw "Mod function takes one number";
			}

			return MK_NUMBER(arg.value);
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Mod function takes two numbers";
		}

		return MK_NUMBER(arg1.value % arg2.value);
	}
	// A built in function that handles sin of radians
	function sinFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Sin function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Sin function takes one number";
		}

		return MK_NUMBER(Math.sin(arg.value));
	}
	// A built in function that handles the inverse sin
	function asinFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Asin function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Asin function takes one number";
		}

		return MK_NUMBER(Math.asin(arg.value));
	}
	// A built in function that handles cos
	function cosFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Cos function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Cos function takes one number";
		}

		return MK_NUMBER(Math.cos(arg.value));
	}
	// A built in function that handles the inverse cos
	function acosFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Acos function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Acos function takes one number";
		}

		return MK_NUMBER(Math.acos(arg.value));
	}
	// A built in function that handles tan
	function tanFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Tan function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Tan function takes one number";
		}

		return MK_NUMBER(Math.tan(arg.value));
	}
	// A built in function that handles the inverse tan
	function atanFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Atan function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Atan function takes one number";
		}

		return MK_NUMBER(Math.atan(arg.value));
	}
	// A built in function that handles cot
	function cotFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Cos function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Cos function takes one number";
		}

		return MK_NUMBER(1 / Math.tan(arg.value));
	}
	// A built in function that handles sec
	function secFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Sec function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Sec function takes one number";
		}

		return MK_NUMBER(1 / Math.cos(arg.value));
	}
	// A built in function that handles csc
	function cscFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Csc function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Csc function takes one number";
		}

		return MK_NUMBER(1 / Math.sin(arg.value));
	}
	// A built in function that handles sqrt
	function sqrtFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Sqrt function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Sqrt function takes one number";
		}

		return MK_NUMBER(Math.sqrt(arg.value));
	}
	// A built in function that handles abs
	function absFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Abs function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Abs function takes one number";
		}

		return MK_NUMBER(Math.abs(arg.value));
	}
	// A built in function that handles log
	function logFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Log function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Log function takes one number";
		}

		return MK_NUMBER(Math.log(arg.value));
	}
	// A built in function that handles log10
	function log10Function(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Log10 function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Log10 function takes one number";
		}

		return MK_NUMBER(Math.log10(arg.value));
	}
	// A built in log that handles a log of a custom base
	function logBaseFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Log function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Log function takes two numbers";
		}

		return MK_NUMBER(Math.log(arg1.value) / Math.log(arg2.value));
	}
	// A built in function that handles floor of a number
	function floorFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Floor function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Floor function takes one number";
		}

		return MK_NUMBER(Math.floor(arg.value));
	}
	// A built in function that handles ceil of a number
	function ceilFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Ceil function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "number") {
			throw "Ceil function takes one number";
		}

		return MK_NUMBER(Math.ceil(arg.value));
	}
	// A built in function that handles min of two numbers or one number and an array
	function minFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Min function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Min function takes two numbers";
		}

		return MK_NUMBER(Math.min(arg1.value, arg2.value));
	}
	// A built in function that handles max of two numbers or one number and an array
	function maxFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Max function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Max function takes two numbers";
		}

		return MK_NUMBER(Math.max(arg1.value, arg2.value));
	}
	// A built in function that handles pow and i can tell it the power of the number
	function powFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Pow function takes two arguments";
		}

		const [arg1, arg2] = args;

		if (arg1.type !== "number" || arg2.type !== "number") {
			throw "Pow function takes two numbers";
		}

		return MK_NUMBER(Math.pow(arg1.value, arg2.value));
	}
	// A built in function that handles the meadian of a list of numbers
	function medianFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Median function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Median function takes one array";
		}

		const numbers = arg.value.filter((v: { type: string; }) => v.type === "number");

		if (numbers.length !== arg.value.length) {
			throw "Median function takes one array of numbers";
		}

		const sorted = numbers.sort((a: { value: number; }, b: { value: number; }) => a.value - b.value);

		if (sorted.length % 2 === 0) {
			const mid = sorted.length / 2;
			return MK_NUMBER((sorted[mid].value + sorted[mid - 1].value) / 2);
		} else {
			return sorted[Math.floor(sorted.length / 2)];
		}
	}
	// A built in function that handles the mean of a list of numbers
	function meanFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Mean function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Mean function takes one array";
		}

		const numbers = arg.value.filter((v: { type: string; }) => v.type === "number");

		if (numbers.length !== arg.value.length) {
			throw "Mean function takes one array of numbers";
		}

		const sum = numbers.reduce((acc: any, v: { value: any; }) => acc + v.value, 0);

		return MK_NUMBER(sum / numbers.length);
	}
	// A built in function that handles the mode of a list of numbers
	function modeFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 1) {
			throw "Mode function takes one argument";
		}

		const [arg] = args;

		if (arg.type !== "array") {
			throw "Mode function takes one array";
		}

		const numbers = arg.value.filter((v: { type: string; }) => v.type === "number");

		if (numbers.length !== arg.value.length) {
			throw "Mode function takes one array of numbers";
		}

		const counts: Record<number, number> = {};

		for (const v of numbers) {
			if (counts[v.value] === undefined) {
				counts[v.value] = 1;
			} else {
				counts[v.value]++;
			}
		}

		const max = Object.entries(counts).reduce(
			(acc, [k, v]) => (v > acc[1] ? [k, v] : acc),
			["", 0]
		);

		return MK_NUMBER(Number(max[0]));
	}
	// Picks a random number between two given numbers
	function randomFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2) {
			throw "Random function takes two arguments";
		}

		const [min, max] = args;

		if (min.type !== "number" || max.type !== "number") {
			throw "Random function takes two numbers";
		}

		return MK_NUMBER(Math.random() * (max.value - min.value) + min.value);
	}

	env.declareVar("random", MK_NATIVE_FUNCTION(randomFunction), true);

	env.declareVar("add", MK_NATIVE_FUNCTION(addFunction), true);
	env.declareVar("sub", MK_NATIVE_FUNCTION(subFunction), true);
	env.declareVar("mul", MK_NATIVE_FUNCTION(mulFunction), true);
	env.declareVar("div", MK_NATIVE_FUNCTION(divFunction), true);
	env.declareVar("mod", MK_NATIVE_FUNCTION(modFunction), true);

	env.declareVar("median", MK_NATIVE_FUNCTION(medianFunction), true);
	env.declareVar("mean", MK_NATIVE_FUNCTION(meanFunction), true);
	env.declareVar("mode", MK_NATIVE_FUNCTION(modeFunction), true);

	env.declareVar("floor", MK_NATIVE_FUNCTION(floorFunction), true);
	env.declareVar("ceil", MK_NATIVE_FUNCTION(ceilFunction), true);
	env.declareVar("min", MK_NATIVE_FUNCTION(minFunction), true);
	env.declareVar("max", MK_NATIVE_FUNCTION(maxFunction), true);
	env.declareVar("pow", MK_NATIVE_FUNCTION(powFunction), true);

	env.declareVar("sin", MK_NATIVE_FUNCTION(sinFunction), true);
	env.declareVar("cos", MK_NATIVE_FUNCTION(cosFunction), true);
	env.declareVar("tan", MK_NATIVE_FUNCTION(tanFunction), true);

	env.declareVar("asin", MK_NATIVE_FUNCTION(asinFunction), true);
	env.declareVar("acos", MK_NATIVE_FUNCTION(acosFunction), true);
	env.declareVar("atan", MK_NATIVE_FUNCTION(atanFunction), true);

	env.declareVar("cot", MK_NATIVE_FUNCTION(cotFunction), true);
	env.declareVar("sec", MK_NATIVE_FUNCTION(secFunction), true);
	env.declareVar("csc", MK_NATIVE_FUNCTION(cscFunction), true);

	env.declareVar("sqrt", MK_NATIVE_FUNCTION(sqrtFunction), true);
	env.declareVar("abs", MK_NATIVE_FUNCTION(absFunction), true); // Absolute value
	env.declareVar("ln", MK_NATIVE_FUNCTION(logFunction), true); // Natural log
	env.declareVar("log", MK_NATIVE_FUNCTION(logBaseFunction), true); // Custom base log
	env.declareVar("log10", MK_NATIVE_FUNCTION(log10Function), true); // Base 10 log

	env.declareVar("radToDeg", MK_NATIVE_FUNCTION(radToDegFunction), true);
	env.declareVar("degToRad", MK_NATIVE_FUNCTION(degToRadFunction), true);
	env.declareVar("deg", MK_NATIVE_FUNCTION(degFunction), true);
	env.declareVar("pi", MK_NATIVE_FUNCTION(piFunction), true);
}

export default class Enviroment {
	parent?: Enviroment;
	private variables: Map<string, RuntimeVal>;
	private constants: Set<string>;

	constructor(parentENV?: Enviroment) {
		this.parent = parentENV;
		this.variables = new Map();
		this.constants = new Set();
	}

	public declareVar(
		varname: string,
		value: RuntimeVal,
		constant: boolean
	): RuntimeVal {
		if (this.variables.has(varname)) {
			throw `Variable ${varname} already declared in this enviroment`;
		}

		this.variables.set(varname, value);

		if (constant) {
			this.constants.add(varname);
		}

		return value;
	}

	public assignVar(varname: string, value: RuntimeVal): RuntimeVal {
		const env = this.resolve(varname, varname);

		// Cannot assign to constants
		if (env.constants.has(varname)) {
			throw `Cannot assign to constant '${varname}'`;
		}

		env.variables.set(varname, value);
		return value;
	}

	public lookupVar(varname: string): RuntimeVal {
		const env = this.resolve(varname, varname);
		return env.variables.get(varname) as RuntimeVal;
	}

	public resolve(obj: string, varname: string): Enviroment {
		if (this.variables.has(varname)) {
			return this;
		}

		if (this.variables.has(obj)) {
			let val = this.variables.get(obj)?.value;
			console.log(val);
		}

		if (this.parent == undefined) {
			throw `Cannot resolve '${varname}' as it does not exist!`;
		}

		return this.parent.resolve(obj, varname);
	}

	public get(varname: string): RuntimeVal {
		return this.variables.get(varname) as RuntimeVal;
	}

	public set(varname: string, value: RuntimeVal): void {
		this.variables.set(varname, value);
	}
}