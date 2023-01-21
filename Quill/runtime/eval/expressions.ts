import { AssignmentExpr, BinaryExpr,CallExpr,Identifier, ObjectLiteral } from "../../FrontEnd/ast.ts";
import { TokenType } from "../../FrontEnd/lexer.ts";
import Enviroment from "../enviroment.ts";
import { evaluate } from "../interpreter.ts";
import { NumberVal,RuntimeVal,MK_NULL, ObjectVal, NativeFunctionVal, FunctionVal, NullVal, MK_BOOL, BoolVal } from "../values.ts";

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
	else if (operator == "<") {
		result = leftHandSide.value < rightHandSide.value ? 1 : 0;
	} 
	else if (operator == ">") {
		result = leftHandSide.value > rightHandSide.value ? 1 : 0;
	} 
	else if (operator == "<=") {
		result = leftHandSide.value <= rightHandSide.value ? 1 : 0;
	} 
	else if (operator == ">=") {
		result = leftHandSide.value >= rightHandSide.value ? 1 : 0;
	} 
	else if (operator == "==") {
		result = leftHandSide.value == rightHandSide.value ? 1 : 0;
	} 
	else if (operator == "!=") {
		result = leftHandSide.value != rightHandSide.value ? 1 : 0;
	}
	else {
		result = leftHandSide.value % rightHandSide.value;
	}

	return { value: result, type: "number" };
}

export function eval_binary_expr (binop: BinaryExpr, env: Enviroment): BoolVal | NullVal | NumberVal {
    const leftHandSide = evaluate(binop.left, env);
    const rightHandSide = evaluate(binop.right, env);

    if (leftHandSide.type === "number" && rightHandSide.type === "number") {
        switch (binop.operator.type) {
            case TokenType.COMPARASENTYPES:
                if (binop.operator.value === ">") {
                    return MK_BOOL(Boolean(leftHandSide.value > rightHandSide.value));
                } else if (binop.operator.value === "<") {
                    return MK_BOOL(Boolean(leftHandSide.value < rightHandSide.value));
                }
                break;
            default:
                return eval_numeric_binary_expr(leftHandSide as NumberVal, 
                    rightHandSide as NumberVal, binop.operator);
        }
    } else {
		// One or both are null
		return MK_NULL() as NullVal;
	}

	throw new Error(`invalid binary expression ${JSON.stringify(binop)}`);
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

	if (func.type == "native-function") {
		const result  = (func as NativeFunctionVal).call(args, env);
		return result;
	} 
	
	if (func.type == "function") {
		const fn = func as FunctionVal;
		const scope = new Enviroment(fn.declarationsENV);

		// Create the variables for the parameters list
		for (let i = 0; i < fn.parameters.length; i++) {
			// TODO: check the bonds here. Verify arity of function
			scope.declareVar(fn.parameters[i], args[i], false);
		}

		// Evaluate the function body
		let result: RuntimeVal = MK_NULL();
		// Evaluate the function body line by line
		for (const statement of fn.body) {
			result = evaluate(statement, scope);
		}
		return result;
	}

	throw new Error(`invalid function call ${JSON.stringify(expr)}`);
} 