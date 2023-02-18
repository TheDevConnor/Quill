"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalENV = void 0;
// deno-lint-ignore-file
const values_ts_1 = require("./values.ts");
const tracing_ts_1 = require("../FrontEnd/tracing.ts");
function createGlobalENV() {
    const env = new Enviroment();
    // Create Default Global Enviroment
    env.declareVar("false", (0, values_ts_1.MK_BOOL)(false), true);
    env.declareVar("true", (0, values_ts_1.MK_BOOL)(true), true);
    env.declareVar("?", (0, values_ts_1.MK_NULL)(), true);
    // Define a native built in function
    // A custom print function that only prints the value
    env.declareVar("info", (0, values_ts_1.MK_NATIVE_FUNCTION)((args, _scope) => {
        const _info = console.log((0, tracing_ts_1.format)(true, args.map((item) => item["value"])));
        return (0, values_ts_1.MK_NULL)() || (0, values_ts_1.MK_NUMBER)(Number(_info));
    }), true);
    function formatFunction(args, _scope) {
        (0, tracing_ts_1.trace)((0, tracing_ts_1.format)(false, "{" + args.map((arg) => arg.value).join(", ") + "}"));
        return (0, values_ts_1.MK_NULL)();
    }
    env.declareVar("trace", (0, values_ts_1.MK_NATIVE_FUNCTION)(formatFunction), true);
    function debugFunction(args, _scope) {
        (0, tracing_ts_1.debug)((0, tracing_ts_1.format)(false, args));
        return (0, values_ts_1.MK_NULL)();
    }
    env.declareVar("debug", (0, values_ts_1.MK_NATIVE_FUNCTION)(debugFunction), true);
    function warnFunction(args, _scope) {
        (0, tracing_ts_1.warn)((0, tracing_ts_1.format)(false, "{" + args.map((arg) => arg.value).join(", ") + "}"));
        return (0, values_ts_1.MK_NULL)();
    }
    env.declareVar("warn", (0, values_ts_1.MK_NATIVE_FUNCTION)(warnFunction), true);
    function errorFunction(args, _scope) {
        (0, tracing_ts_1.error)((0, tracing_ts_1.format)(false, args));
        return (0, values_ts_1.MK_NULL)();
    }
    env.declareVar("error", (0, values_ts_1.MK_NATIVE_FUNCTION)(errorFunction), true);
    env.declareVar("input", (0, values_ts_1.MK_NATIVE_FUNCTION)((args, _scope) => {
        const input = prompt((0, tracing_ts_1.format)(true, args));
        return input ? (0, values_ts_1.MK_NUMBER)(Number(input)) : (0, values_ts_1.MK_NULL)();
    }), true);
    // A built in function that handles addition and can take in either one or two arguments
    function addFunction(args, _scope) {
        if (args.length === 0) {
            throw "Add function takes at least one argument";
        }
        if (args.length === 1) {
            const [arg] = args;
            if (arg.type !== "number") {
                throw "Add function takes one number";
            }
            return (0, values_ts_1.MK_NUMBER)(arg.value);
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Add function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(arg1.value + arg2.value);
    }
    // A built in function that handles subtraction and can take in either one or two arguments
    function subFunction(args, _scope) {
        if (args.length === 0) {
            throw "Sub function takes at least one argument";
        }
        if (args.length === 1) {
            const [arg] = args;
            if (arg.type !== "number") {
                throw "Sub function takes one number";
            }
            return (0, values_ts_1.MK_NUMBER)(-arg.value);
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Sub function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(arg1.value - arg2.value);
    }
    // A built in function that handles multiplication and can take in either one or two arguments
    function mulFunction(args, _scope) {
        if (args.length === 0) {
            throw "Mul function takes at least one argument";
        }
        if (args.length === 1) {
            const [arg] = args;
            if (arg.type !== "number") {
                throw "Mul function takes one number";
            }
            return (0, values_ts_1.MK_NUMBER)(arg.value);
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Mul function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(arg1.value * arg2.value);
    }
    // A built in function that handles division and can take in either one or two arguments
    function divFunction(args, _scope) {
        if (args.length === 0) {
            throw "Div function takes at least one argument";
        }
        if (args.length === 1) {
            const [arg] = args;
            if (arg.type !== "number") {
                throw "Div function takes one number";
            }
            return (0, values_ts_1.MK_NUMBER)(1 / arg.value);
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Div function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(arg1.value / arg2.value);
    }
    // A built in function that handles modulo and can take in either one or two arguments
    function modFunction(args, _scope) {
        if (args.length === 0) {
            throw "Mod function takes at least one argument";
        }
        if (args.length === 1) {
            const [arg] = args;
            if (arg.type !== "number") {
                throw "Mod function takes one number";
            }
            return (0, values_ts_1.MK_NUMBER)(arg.value);
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Mod function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(arg1.value % arg2.value);
    }
    // A built in function that handles sin of radians
    function sinFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Sin function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Sin function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.sin(arg.value));
    }
    // A built in function that handles the inverse sin
    function asinFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Asin function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Asin function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.asin(arg.value));
    }
    // A built in function that handles cos
    function cosFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Cos function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Cos function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.cos(arg.value));
    }
    // A built in function that handles the inverse cos
    function acosFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Acos function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Acos function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.acos(arg.value));
    }
    // A built in function that handles tan
    function tanFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Tan function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Tan function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.tan(arg.value));
    }
    // A built in function that handles the inverse tan
    function atanFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Atan function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Atan function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.atan(arg.value));
    }
    // A built in function that handles cot
    function cotFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Cos function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Cos function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(1 / Math.tan(arg.value));
    }
    // A built in function that handles sec
    function secFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Sec function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Sec function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(1 / Math.cos(arg.value));
    }
    // A built in function that handles csc
    function cscFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Csc function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Csc function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(1 / Math.sin(arg.value));
    }
    // A built in function that handles sqrt
    function sqrtFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Sqrt function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Sqrt function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.sqrt(arg.value));
    }
    // A built in function that handles abs
    function absFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Abs function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Abs function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.abs(arg.value));
    }
    // A built in function that handles log
    function logFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Log function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Log function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.log(arg.value));
    }
    // A built in function that handles log10
    function log10Function(args, _scope) {
        if (args.length !== 1) {
            throw "Log10 function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Log10 function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.log10(arg.value));
    }
    // A built in log that handles a log of a custom base
    function logBaseFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Log function takes two arguments";
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Log function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.log(arg1.value) / Math.log(arg2.value));
    }
    // A built in function that handles floor of a number
    function floorFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Floor function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Floor function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.floor(arg.value));
    }
    // A built in function that handles ceil of a number
    function ceilFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Ceil function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Ceil function takes one number";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.ceil(arg.value));
    }
    // A built in function that handles min of two numbers or one number and an array
    function minFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Min function takes two arguments";
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Min function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.min(arg1.value, arg2.value));
    }
    // A built in function that handles max of two numbers or one number and an array
    function maxFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Max function takes two arguments";
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Max function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.max(arg1.value, arg2.value));
    }
    // A built in function that handles pow and i can tell it the power of the number
    function powFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Pow function takes two arguments";
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "number" || arg2.type !== "number") {
            throw "Pow function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.pow(arg1.value, arg2.value));
    }
    // A built in function that handles the meadian of a list of numbers
    function medianFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Median function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "array") {
            throw "Median function takes one array";
        }
        const numbers = arg.value.filter((v) => v.type === "number");
        if (numbers.length !== arg.value.length) {
            throw "Median function takes one array of numbers";
        }
        const sorted = numbers.sort((a, b) => a.value - b.value);
        if (sorted.length % 2 === 0) {
            const mid = sorted.length / 2;
            return (0, values_ts_1.MK_NUMBER)((sorted[mid].value + sorted[mid - 1].value) / 2);
        }
        else {
            return sorted[Math.floor(sorted.length / 2)];
        }
    }
    // A built in function that handles the mean of a list of numbers
    function meanFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Mean function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "array") {
            throw "Mean function takes one array";
        }
        const numbers = arg.value.filter((v) => v.type === "number");
        if (numbers.length !== arg.value.length) {
            throw "Mean function takes one array of numbers";
        }
        const sum = numbers.reduce((acc, v) => acc + v.value, 0);
        return (0, values_ts_1.MK_NUMBER)(sum / numbers.length);
    }
    // A built in function that handles the mode of a list of numbers
    function modeFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Mode function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "array") {
            throw "Mode function takes one array";
        }
        const numbers = arg.value.filter((v) => v.type === "number");
        if (numbers.length !== arg.value.length) {
            throw "Mode function takes one array of numbers";
        }
        const counts = {};
        for (const v of numbers) {
            if (counts[v.value] === undefined) {
                counts[v.value] = 1;
            }
            else {
                counts[v.value]++;
            }
        }
        const max = Object.entries(counts).reduce((acc, [k, v]) => (v > acc[1] ? [k, v] : acc), ["", 0]);
        return (0, values_ts_1.MK_NUMBER)(Number(max[0]));
    }
    // A buitl in function to push a value to an array
    function pushFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Push function takes two arguments";
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "array") {
            throw "Push function takes an array and a value";
        }
        return (0, values_ts_1.MK_ARRAY)([...arg1.value, arg2]);
    }
    // A built in function to pop a value from an array
    function popFunction(args, _scope) {
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
        return (0, values_ts_1.MK_ARRAY)(arg.value.slice(0, -1));
    }
    // A built in function to get the length of an array
    function lengthFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Length function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "array") {
            throw "Length function takes an array";
        }
        return (0, values_ts_1.MK_NUMBER)(arg.value.length);
    }
    // A built in function to get the first element of an array
    function firstFunction(args, _scope) {
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
    function lastFunction(args, _scope) {
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
    function nthFunction(args, _scope) {
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
    function indexOfFunction(args, _scope) {
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
        const index = arg1.value.findIndex((v) => v.value === arg2.value);
        if (index === -1) {
            throw "Index of function takes a value that is in the array";
        }
        return (0, values_ts_1.MK_NUMBER)(index);
    }
    // A built in function that pulls from an array
    function pullFunction(args, _scope) {
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
        const index = arg1.value.findIndex((v) => v.value === arg2.value);
        if (index === -1) {
            throw "Pull function takes a value that is in the array";
        }
        return (0, values_ts_1.MK_ARRAY)([...arg1.value.slice(0, index), ...arg1.value.slice(index + 1)]);
    }
    // A built in function to get the sum of an array
    function sumFunction(args, _scope) {
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
        return (0, values_ts_1.MK_NUMBER)(arg.value.reduce((acc, v) => acc + v.value, 0));
    }
    // A built in function to get the date
    function dateFunction(_args, _scope) {
        return (0, values_ts_1.MK_NUMBER)(new Date().getDate());
    }
    // A built in function to get the time
    function timeFunction(_args, _scope) {
        return (0, values_ts_1.MK_NUMBER)(new Date().getTime());
    }
    // A built in function that will handle appending to an array
    function appendFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Append function takes two arguments";
        }
        const [arg1, arg2] = args;
        if (arg1.type !== "array") {
            throw "Append function takes an array and a value";
        }
        return (0, values_ts_1.MK_ARRAY)([...arg1.value, arg2]);
    }
    // A built in break function that will break out of a loop
    function breakFunction(_args, _scope) {
        throw "break";
    }
    // a built in function for null values
    function nullFunction(_args, _scope) {
        return (0, values_ts_1.MK_NULL)();
    }
    // A built in function to convert radians to degrees
    function radToDegFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Rad to deg function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Rad to deg function takes a number";
        }
        return (0, values_ts_1.MK_NUMBER)(arg.value * (180 / Math.PI));
    }
    // A built in function to convert degrees to radians
    function degToRadFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Deg to rad function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Deg to rad function takes a number";
        }
        return (0, values_ts_1.MK_NUMBER)(arg.value * (Math.PI / 180));
    }
    // A built in function to define a number as a degree
    function degFunction(args, _scope) {
        if (args.length !== 1) {
            throw "Deg function takes one argument";
        }
        const [arg] = args;
        if (arg.type !== "number") {
            throw "Deg function takes a number";
        }
        return (0, values_ts_1.MK_NUMBER)(arg.value * (Math.PI / 180));
    }
    // Pi
    function piFunction(_args, _scope) {
        return (0, values_ts_1.MK_NUMBER)(Math.PI);
    }
    env.declareVar("add", (0, values_ts_1.MK_NATIVE_FUNCTION)(addFunction), true);
    env.declareVar("sub", (0, values_ts_1.MK_NATIVE_FUNCTION)(subFunction), true);
    env.declareVar("mul", (0, values_ts_1.MK_NATIVE_FUNCTION)(mulFunction), true);
    env.declareVar("div", (0, values_ts_1.MK_NATIVE_FUNCTION)(divFunction), true);
    env.declareVar("mod", (0, values_ts_1.MK_NATIVE_FUNCTION)(modFunction), true);
    env.declareVar("median", (0, values_ts_1.MK_NATIVE_FUNCTION)(medianFunction), true);
    env.declareVar("mean", (0, values_ts_1.MK_NATIVE_FUNCTION)(meanFunction), true);
    env.declareVar("mode", (0, values_ts_1.MK_NATIVE_FUNCTION)(modeFunction), true);
    env.declareVar("push", (0, values_ts_1.MK_NATIVE_FUNCTION)(pushFunction), true);
    env.declareVar("pop", (0, values_ts_1.MK_NATIVE_FUNCTION)(popFunction), true);
    env.declareVar("pull", (0, values_ts_1.MK_NATIVE_FUNCTION)(pullFunction), true);
    env.declareVar("length", (0, values_ts_1.MK_NATIVE_FUNCTION)(lengthFunction), true);
    env.declareVar("first", (0, values_ts_1.MK_NATIVE_FUNCTION)(firstFunction), true);
    env.declareVar("last", (0, values_ts_1.MK_NATIVE_FUNCTION)(lastFunction), true);
    env.declareVar("nth", (0, values_ts_1.MK_NATIVE_FUNCTION)(nthFunction), true);
    env.declareVar("indexOf", (0, values_ts_1.MK_NATIVE_FUNCTION)(indexOfFunction), true);
    env.declareVar("sumArray", (0, values_ts_1.MK_NATIVE_FUNCTION)(sumFunction), true);
    env.declareVar("floor", (0, values_ts_1.MK_NATIVE_FUNCTION)(floorFunction), true);
    env.declareVar("ceil", (0, values_ts_1.MK_NATIVE_FUNCTION)(ceilFunction), true);
    env.declareVar("min", (0, values_ts_1.MK_NATIVE_FUNCTION)(minFunction), true);
    env.declareVar("max", (0, values_ts_1.MK_NATIVE_FUNCTION)(maxFunction), true);
    env.declareVar("pow", (0, values_ts_1.MK_NATIVE_FUNCTION)(powFunction), true);
    env.declareVar("sin", (0, values_ts_1.MK_NATIVE_FUNCTION)(sinFunction), true);
    env.declareVar("cos", (0, values_ts_1.MK_NATIVE_FUNCTION)(cosFunction), true);
    env.declareVar("tan", (0, values_ts_1.MK_NATIVE_FUNCTION)(tanFunction), true);
    env.declareVar("asin", (0, values_ts_1.MK_NATIVE_FUNCTION)(asinFunction), true);
    env.declareVar("acos", (0, values_ts_1.MK_NATIVE_FUNCTION)(acosFunction), true);
    env.declareVar("atan", (0, values_ts_1.MK_NATIVE_FUNCTION)(atanFunction), true);
    env.declareVar("cot", (0, values_ts_1.MK_NATIVE_FUNCTION)(cotFunction), true);
    env.declareVar("sec", (0, values_ts_1.MK_NATIVE_FUNCTION)(secFunction), true);
    env.declareVar("csc", (0, values_ts_1.MK_NATIVE_FUNCTION)(cscFunction), true);
    env.declareVar("sqrt", (0, values_ts_1.MK_NATIVE_FUNCTION)(sqrtFunction), true);
    env.declareVar("abs", (0, values_ts_1.MK_NATIVE_FUNCTION)(absFunction), true); // Absolute value
    env.declareVar("ln", (0, values_ts_1.MK_NATIVE_FUNCTION)(logFunction), true); // Natural log
    env.declareVar("log", (0, values_ts_1.MK_NATIVE_FUNCTION)(logBaseFunction), true); // Custom base log
    env.declareVar("log10", (0, values_ts_1.MK_NATIVE_FUNCTION)(log10Function), true); // Base 10 log
    env.declareVar("date", (0, values_ts_1.MK_NATIVE_FUNCTION)(dateFunction), true);
    env.declareVar("time", (0, values_ts_1.MK_NATIVE_FUNCTION)(timeFunction), true);
    env.declareVar("append", (0, values_ts_1.MK_NATIVE_FUNCTION)(appendFunction), true);
    env.declareVar("break", (0, values_ts_1.MK_NATIVE_FUNCTION)(breakFunction), true);
    env.declareVar("null", (0, values_ts_1.MK_NATIVE_FUNCTION)(nullFunction), true);
    env.declareVar("radToDeg", (0, values_ts_1.MK_NATIVE_FUNCTION)(radToDegFunction), true);
    env.declareVar("degToRad", (0, values_ts_1.MK_NATIVE_FUNCTION)(degToRadFunction), true);
    env.declareVar("deg", (0, values_ts_1.MK_NATIVE_FUNCTION)(degFunction), true);
    env.declareVar("pi", (0, values_ts_1.MK_NATIVE_FUNCTION)(piFunction), true);
    // Picks a random number between two given numbers
    function randomFunction(args, _scope) {
        if (args.length !== 2) {
            throw "Random function takes two arguments";
        }
        const [min, max] = args;
        if (min.type !== "number" || max.type !== "number") {
            throw "Random function takes two numbers";
        }
        return (0, values_ts_1.MK_NUMBER)(Math.random() * (max.value - min.value) + min.value);
    }
    env.declareVar("random", (0, values_ts_1.MK_NATIVE_FUNCTION)(randomFunction), true);
    // TODO: a built in function that handles graphics
    // TODO: a built in function that handles sound
    // TODO: a built in function that handles sockets
    // TODO: a built in function that handles importing files
    return env;
}
exports.createGlobalENV = createGlobalENV;
class Enviroment {
    constructor(parentENV) {
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();
    }
    declareVar(varname, value, constant) {
        if (this.variables.has(varname)) {
            throw `Variable ${varname} already declared in this enviroment`;
        }
        this.variables.set(varname, value);
        if (constant) {
            this.constants.add(varname);
        }
        return value;
    }
    assignVar(varname, value) {
        const env = this.resolve(varname, varname);
        // Cannot assign to constants
        if (env.constants.has(varname)) {
            throw `Cannot assign to constant '${varname}'`;
        }
        env.variables.set(varname, value);
        return value;
    }
    lookupVar(varname) {
        const env = this.resolve(varname, varname);
        return env.variables.get(varname);
    }
    resolve(obj, varname) {
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
    get(varname) {
        return this.variables.get(varname);
    }
    set(varname, value) {
        this.variables.set(varname, value);
    }
}
exports.default = Enviroment;
//# sourceMappingURL=enviroment.js.map