import { MK_BOOL, MK_NATIVE_FUNCTION, MK_NULL, MK_NUMBER, RuntimeVal } from "./values.ts";
import * as tracer from "../FrontEnd/tracing.ts";
export function createGlobalENV () {
	const env = new Enviroment();
	// Create Default Global Enviroment
	env.declareVar("false", MK_BOOL(false), true);
    env.declareVar("true", MK_BOOL(true), true);
	env.declareVar("?", MK_NULL(), true);

	// Define a native built in function
	env.declareVar("CSInfo", MK_NATIVE_FUNCTION((args, _scope) => {
		tracer.info(tracer.format(args));
		return MK_NULL();
	}), true);

	env.declareVar("CSError", MK_NATIVE_FUNCTION((args, _scope) => {
		tracer.error(tracer.format(args));
		return MK_NULL();
	}), true);

	env.declareVar("CSWarn", MK_NATIVE_FUNCTION((args, _scope) => {
		tracer.warn(tracer.format(args));
		return MK_NULL();
	}), true);

	env.declareVar("CSTrace", MK_NATIVE_FUNCTION((args, _scope) => {
		tracer.trace(tracer.format(args));
		return MK_NULL();
	}), true);

	env.declareVar("CSDebug", MK_NATIVE_FUNCTION((args, _scope) => {
		tracer.debug(tracer.format(args));
		return MK_NULL();
	}), true);

	// Time
	function timeFunction (_args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		return MK_NUMBER(Date.now());
	}
	env.declareVar("GetTime", MK_NATIVE_FUNCTION(timeFunction), true);

	// Picks a random number between two given numbers
	function randomFunction (args: RuntimeVal[], _scope: Enviroment): RuntimeVal {
		if (args.length !== 2){
			throw "Random function takes two arguments";
		}

		const [min, max] = args;

		if (min.type !== "number" || max.type !== "number"){
			throw "Random function takes two numbers";
		}

		return MK_NUMBER(Math.random() * (max.value - min.value) + min.value);

	}
	env.declareVar("Random", MK_NATIVE_FUNCTION(randomFunction), true);

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

    public declareVar (varname: string, value: RuntimeVal, constant: boolean): RuntimeVal {
        if (this.variables.has(varname)){
            throw `Variable ${varname} already declared in this enviroment`;
        }

        this.variables.set(varname, value);

		if (constant){
			this.constants.add(varname);
		}

        return value;
    }

	public assignVar (varname: string, value: RuntimeVal): RuntimeVal {
		const env = this.resolve(varname);

		// Cannot assign to constants
		if (env.constants.has(varname)){
			throw `Cannot assign to constant '${varname}'`;
		}
		
		env.variables.set(varname, value);
		return value;
	}

	public lookupvar (varname: string): RuntimeVal {
		const env = this.resolve(varname);
		return env.variables.get(varname) as RuntimeVal;
	}
	
	public resolve (varname: string): Enviroment {
		if (this.variables.has(varname)){
			return this;
		}

		if (this.parent == undefined){ throw `Cannot resolve '${varname}' as it does not exist!` }
		
		return this.parent.resolve(varname);
	}
}