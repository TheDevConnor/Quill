import { Stmt, Expr } from "../frontend/ast.ts";
import Enviroment from "./enviroment.ts";
export type ValueType =
	| "null"
	| "number"
	| "boolean"
	| "object"
	| "native-function"
	| "function"
	| "string"
	| "array"
	| "char"
	| "undefined";

export interface RuntimeVal {
	kind: string;
	type: ValueType | any;
	value: any;
}

export interface NullVal extends RuntimeVal {
	type: "null";
	value: null;
}

export function MK_NULL() {
	return { value: null, type: "null" } as NullVal;
}
export interface BooleanVal extends RuntimeVal {
	type: "boolean";
	value: boolean;
}

export function MK_BOOL(b = false) {
	return { value: b, type: "boolean" } as BooleanVal;
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
export type StaticFunctionCall = (obj: RuntimeVal) => RuntimeVal;

export interface NativeFunctionVal extends RuntimeVal {
	type: "native-function";
	call: FunctionCall | StaticFunctionCall;
}

export function MK_NATIVE_FUNCTION(call: FunctionCall) {
	return { type: "native-function", call } as NativeFunctionVal;
}

export function MK_STATIC_BUILTIN_HANDLER<T>(call: (obj: T) => RuntimeVal) {
	return { type: "native-function", call } as NativeFunctionVal;
}

export interface StringVal extends RuntimeVal {
	type: "string";
	value: string;
}

export function MK_STRING(s: string | StringConstructor = String) {
	return { value: s, type: "string" } as unknown as StringVal;
}

export interface ModuleVal extends RuntimeVal {
	type: "module";
	name: string;
	value: RuntimeVal;
}

export interface FunctionVal extends RuntimeVal {
	type: "function";
	name: string;
	parameters: string[];
	declarationsENV: Enviroment;
	body: Stmt[];
}

export interface ArrayVal extends RuntimeVal {
	type: "array";
	name: string;
	declarationsENV: Enviroment;
	element: Stmt[] | Expr[];
}

export function MK_ARRAY(a = Array) {
	return { value: a, type: "array" } as ArrayVal;
}
