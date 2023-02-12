import {
  MK_BOOL,
  MK_NATIVE_FUNCTION,
  MK_NULL,
  MK_NUMBER,
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
  env.declareVar(
    "info",
    MK_NATIVE_FUNCTION((args, _scope) => {
      const arr = Array.from(args[0]["value"]);
      const kv_pairs = arr.map((item) => item["value"]);
      const _info = info(format(true, kv_pairs, args));
      return MK_NUMBER(Number(_info));
    }),
    true
  );

  env.declareVar(
    "console",
    MK_NATIVE_FUNCTION((args, _scope) => {
      console.log(...args);
      return MK_NULL();
    }),
    true
  );


  env.declareVar(
    "error",
    MK_NATIVE_FUNCTION((args, _scope) => {
      const arr = Array.from(args[0]["value"]);
      const kv_pairs = arr.map((item) => item["value"]);
      const _error = error(format(true, kv_pairs, args));
      return MK_NUMBER(Number(_error));
    }),
    true
  );

  env.declareVar(
    "warn",
    MK_NATIVE_FUNCTION((args, _scope) => {
      const arr = Array.from(args[0]["value"]);
      const kv_pairs = arr.map((item) => item["value"]);
      const _warn = warn(format(true, kv_pairs, args));
      return MK_NUMBER(Number(_warn));
    }),
    true
  );

  env.declareVar(
    "trace",
    MK_NATIVE_FUNCTION((args, _scope) => {
      const arr = Array.from(args[0]["value"]);
      const kv_pairs = arr.map((item) => item["value"]);
      const _trace = trace(format(false, kv_pairs, args));
      return MK_NUMBER(Number(_trace));
    }),
    true
  );

  env.declareVar(
    "debug",
    MK_NATIVE_FUNCTION((args, _scope) => {
      const arr = Array.from(args[0]["value"]);
      const kv_pairs = arr.map((item) => item["value"]);
      const _debug = debug(format(false, kv_pairs, args));
      return MK_NUMBER(Number(_debug));
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
