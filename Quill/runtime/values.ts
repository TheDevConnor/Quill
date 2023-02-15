import { Stmt, Expr } from "../Frontend/ast.ts";
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
  type: ValueType;
  value: any;

  [index: string]: any;
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

export function MK_ARRAY(a: any[] = []) {
  return { value: a, type: "array" } as ArrayVal;
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

export interface StringVal extends RuntimeVal {
  type: "string";
  value: string;
}

export function MK_STRING(s = String) {
  return { value: s, type: "string" } as unknown as StringVal;
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
