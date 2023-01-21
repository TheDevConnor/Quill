import { Stmt } from "../frontend/ast.ts";
import Enviroment from "./enviroment.ts";
export type ValueType = "null" | "number" | "boolean" | "object" | "native-function" | "function";

export interface RuntimeVal {
    type: ValueType;
	value: any;
}

export interface NullVal extends RuntimeVal {
	type: "null";
	value: null;
}

export function MK_NULL() {
	return { value: null, type: "null" } as NullVal;
}

export interface BoolVal extends RuntimeVal {
	type: "boolean";
	value: boolean;
}

export function MK_BOOL(b = false) {
	return { value: b, type: "boolean" } as BoolVal;
}

export interface NumberVal extends RuntimeVal {
	type: "number";
	value: number;
}

export function MK_NUMBER(n = 0) {
	return { value: n, type: "number" } as NumberVal;
}

export interface ObjectVal extends RuntimeVal {
	type: "object";
	properties: Map<string, RuntimeVal>;
}

export type FunctionCall = (args: RuntimeVal[], env: Enviroment) => RuntimeVal;

export interface NativeFunctionVal extends RuntimeVal {
	type: "native-function";
	call: FunctionCall;
}

export function MK_NATIVE_FUNCTION(call: FunctionCall) {
	return { type: "native-function", call } as NativeFunctionVal;
}

export interface FunctionVal extends RuntimeVal {
	type: "function";
	name: string;
	parameters: string[];
	declarationsENV: Enviroment;
	body: Stmt[];
}