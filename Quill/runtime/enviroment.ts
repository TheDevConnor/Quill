import {
  MK_BOOL,
  MK_NATIVE_FUNCTION,
  MK_NULL,
  MK_NUMBER,
  MK_STRING,
  RuntimeVal,
} from "./values.ts";
import {
  info,
  warn,
  error,
  trace,
  format,
  debug,
} from "../FrontEnd/tracing.ts";
export function createGlobalENV() {
  const env = new Enviroment();
  // Create Default Global Enviroment
  env.declareVar("false", MK_BOOL(false), true);
  env.declareVar("true", MK_BOOL(true), true);
  env.declareVar("?", MK_NULL(), true);

  // Define a native built in function
  // A custom print function that only prints the value
  function infoFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
    info(format(false, "{" + args.map((arg) => arg.value).join(", ") + "}"));
    return MK_NULL();
  }
  env.declareVar("info", MK_NATIVE_FUNCTION(infoFunction), true);

  function formatFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
    trace(format(false, "{" + args.map((arg) => arg.value).join(", ") + "}"));
    return MK_NULL();
  }
  env.declareVar("format", MK_NATIVE_FUNCTION(formatFunction), true);

  function debugFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
    debug(format(false, args));
    return MK_NULL();
  }
  env.declareVar("debug", MK_NATIVE_FUNCTION(debugFunction), true);

  function warnFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
    warn(format(false, "{" + args.map((arg) => arg.value).join(", ") + "}"));
    return MK_NULL();
  }
  env.declareVar("warn", MK_NATIVE_FUNCTION(warnFunction), true);

  function errorFunction(args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
    error(format(false, args));
    return MK_NULL();
  }
  env.declareVar("error", MK_NATIVE_FUNCTION(errorFunction), true);

  env.declareVar(
    "input",
    MK_NATIVE_FUNCTION((args, _scope) => {
      const input = prompt(format(true, args));
      return input ? MK_NUMBER(Number(input)) : MK_NULL();
    }),
    true
  );

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

  env.declareVar("add", MK_NATIVE_FUNCTION(addFunction), true);
  env.declareVar("sub", MK_NATIVE_FUNCTION(subFunction), true);
  env.declareVar("mul", MK_NATIVE_FUNCTION(mulFunction), true);
  env.declareVar("div", MK_NATIVE_FUNCTION(divFunction), true);
  env.declareVar("mod", MK_NATIVE_FUNCTION(modFunction), true);

  env.declareVar("floor", MK_NATIVE_FUNCTION(floorFunction), true);
  env.declareVar("ceil", MK_NATIVE_FUNCTION(ceilFunction), true);
  env.declareVar("min", MK_NATIVE_FUNCTION(minFunction), true);
  env.declareVar("max", MK_NATIVE_FUNCTION(maxFunction), true);
  env.declareVar("pow", MK_NATIVE_FUNCTION(powFunction), true);

  env.declareVar("sin", MK_NATIVE_FUNCTION(sinFunction), true);
  env.declareVar("cos", MK_NATIVE_FUNCTION(cosFunction), true);
  env.declareVar("tan", MK_NATIVE_FUNCTION(tanFunction), true);

  env.declareVar("cot", MK_NATIVE_FUNCTION(cotFunction), true);
  env.declareVar("sec", MK_NATIVE_FUNCTION(secFunction), true);
  env.declareVar("csc", MK_NATIVE_FUNCTION(cscFunction), true);

  env.declareVar("sqrt", MK_NATIVE_FUNCTION(sqrtFunction), true);
  env.declareVar("abs", MK_NATIVE_FUNCTION(absFunction), true); // Absolute value
  env.declareVar("log", MK_NATIVE_FUNCTION(logFunction), true); // Natural log
  env.declareVar("log10", MK_NATIVE_FUNCTION(log10Function), true); // Base 10 log

  // Time
  function timeFunction(_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
    return MK_NUMBER(Date.now());
  }
  env.declareVar("GetTime", MK_NATIVE_FUNCTION(timeFunction), true);

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

  // TODO: a built in function that handles graphics
  // TODO: a built in function that handles sound
  // TODO: a built in function that handles sockets
  // TODO: a built in function that handles importing files

  return env;
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

    if(this.variables.has(obj)){
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