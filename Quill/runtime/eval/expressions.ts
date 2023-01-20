import { AssignmentExpr, BinaryExpr,CallExpr,Identifier, ObjectLiteral } from "../../FrontEnd/ast.ts";
import Enviroment from "../enviroment.ts";
import { evaluate } from "../interpreter.ts";
import { NumberVal,RuntimeVal,MK_NULL, ObjectVal, NativeFunctionVal } from "../values.ts";

function eval_numeric_binary_expr (leftHandSide: NumberVal, rightHandSide: NumberVal, operator: string): NumberVal {
	let result: number;
	if (operator == "+"){
		result = leftHandSide.value + rightHandSide.value;
	}
	else if (operator == "-"){
		result = leftHandSide.value - rightHandSide.value;
	}
	else if (operator == "*"){
		result = leftHandSide.value * rightHandSide.value;
	}
	else if (operator == "/"){
		result = leftHandSide.value / rightHandSide.value;
	}
	else {
		result = leftHandSide.value % rightHandSide.value;
	}

	return { value: result, type: "number" };
}

export function eval_binary_expr (binop: BinaryExpr, env: Enviroment): RuntimeVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);
	
	if (leftHandSide.type == "number" && rightHandSide.type == "number"){
		return eval_numeric_binary_expr(leftHandSide as NumberVal, 
			rightHandSide as NumberVal, binop.operator);
	}

	// One or both are null
	return MK_NULL();
}

export function enal_identifier (ident: Identifier, env: Enviroment): RuntimeVal {
	const val = env.lookupvar(ident.symbol);
	return val;
}

export function eval_object_expr (obj: ObjectLiteral, env: Enviroment): RuntimeVal {
	const object = { type: "object", properties: new Map() } as ObjectVal;

	for (const { key, value } of obj.properties) {
		//console.log(key, value);
		const runtimeVal = (value == undefined) ? env.lookupvar(key) : evaluate(value, env);
		object.properties.set(key, runtimeVal);
	}
	return object;
} 

export function eval_assingment (node: AssignmentExpr, env: Enviroment): RuntimeVal {
	if (node.assingee.kind !== "Identifier") {
		throw new Error(`invalid assingment target ${JSON.stringify(node.assingee)}`);
	}
	const varname = (node.assingee as Identifier).symbol;
	return env.assignVar(varname, evaluate(node.value, env));
}

export function eval_call_expr (expr: CallExpr, env: Enviroment): RuntimeVal {
	const args = expr.args.map((arg) => evaluate(arg, env));
	const func = evaluate(expr.caller, env);

	if (func.type !== "native-function") {
		throw new Error("Native functions are not yet implemented");
	}

	const result  = (func as NativeFunctionVal).call(args, env);
	return result;
} 