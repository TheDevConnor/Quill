// deno-lint-ignore-file
import {
	AssignmentExpr,
	BinaryExpr,
	CallExpr,
	Identifier,
	ObjectLiteral,
	GreaterThanExpr,
	LessThanExpr,
	MemberExpr,
	EqualsExpr,
	NotEqualsExpr,
	AndExpr,
	OrExpr,
	PlusEqualsExpr,
	MinusEqualsExpr,
	GreaterThanOrEqualsExpr,
	LessThanOrEqualsExpr,
	ImportStmt,
	TernaryExpr,
} from "../../FrontEnd/ast.ts";

import {
	NumberVal,
	RuntimeVal,
	MK_NULL,
	ObjectVal,
	NativeFunctionVal,
	FunctionVal,
	NullVal,
	BooleanVal,
	MK_STRING,
	StringVal,
	MK_NATIVE_FUNCTION,
	MK_NUMBER,
	ArrayVal,
	MK_STATIC_BUILTIN_HANDLER,
	StaticFunctionCall,
	ModuleVal,
	MK_ARRAY,
} from "../values.ts";

import Enviroment from "../enviroment.ts";
import { evaluate } from "../interpreter.ts";
import { error, info, debug, trace } from "../../util/tracing.ts";
import { Parser } from "../../FrontEnd/parser.ts";

const parser = new Parser()

function eval_numeric_binary_expr(
	leftHandSide: NumberVal,
	rightHandSide: NumberVal,
	operator: string
): NumberVal {
	let result: number;
	if (operator == "+") {
		result = leftHandSide.value + rightHandSide.value;
	} else if (operator == "-") {
		result = leftHandSide.value - rightHandSide.value;
	} else if (operator == "*") {
		result = leftHandSide.value * rightHandSide.value;
	} else if (operator == "/") {
		result = leftHandSide.value / rightHandSide.value;
	} else if (operator == "<") {
		result = leftHandSide.value < rightHandSide.value ? 1 : 0;
	} else if (operator == ">") {
		result = leftHandSide.value > rightHandSide.value ? 1 : 0;
	} else if (operator == "<=") {
		result = leftHandSide.value <= rightHandSide.value ? 1 : 0;
	} else if (operator == ">=") {
		result = leftHandSide.value >= rightHandSide.value ? 1 : 0;
	} else if (operator == "==") {
		result = leftHandSide.value == rightHandSide.value ? 1 : 0;
	} else if (operator == "!=") {
		result = leftHandSide.value != rightHandSide.value ? 1 : 0;
	} else {
		result = leftHandSide.value % rightHandSide.value;
	}

	return { value: result, type: "number" } as NumberVal;
}

export function eval_binary_expr(
	binop: BinaryExpr,
	env: Enviroment
): NumberVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		return eval_numeric_binary_expr(
			leftHandSide as NumberVal,
			rightHandSide as NumberVal,
			binop.operator
		);
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_greater_than_expr(
	binop: GreaterThanExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = leftHandSide.value > rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_greater_than_or_equals_expr(
	binop: GreaterThanOrEqualsExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = leftHandSide.value >= rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_less_than_expr(
	binop: LessThanExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = leftHandSide.value < rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_less_than_or_equals_expr(
	binop: LessThanOrEqualsExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = leftHandSide.value <= rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_equal_expr(
	binop: EqualsExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = leftHandSide.value == rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_not_equal_expr(
	binop: NotEqualsExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = leftHandSide.value != rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_and_expr(
	binop: AndExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "boolean" && rightHandSide.type == "boolean") {
		const result = leftHandSide.value && rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_or_expr(
	binop: OrExpr,
	env: Enviroment
): BooleanVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "boolean" && rightHandSide.type == "boolean") {
		const result = leftHandSide.value || rightHandSide.value;
		return { value: result, type: "boolean" } as BooleanVal;
	}
	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_plus_equals_expr(
	binop: PlusEqualsExpr,
	env: Enviroment
): NumberVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = (leftHandSide.value += rightHandSide.value);
		return { value: result, type: "number" } as NumberVal;
	}

	// One or both are null
	return MK_NULL() as NullVal;
}

export function eval_minus_equals_expr(
	binop: MinusEqualsExpr,
	env: Enviroment
): NumberVal | NullVal {
	const leftHandSide = evaluate(binop.left, env);
	const rightHandSide = evaluate(binop.right, env);

	if (leftHandSide.type == "number" && rightHandSide.type == "number") {
		const result = (leftHandSide.value -= rightHandSide.value);
		return { value: result, type: "number" } as NumberVal;
	}

	// One or both are null
	return MK_NULL() as NullVal;
}

export function enal_identifier(
	ident: Identifier,
	env: Enviroment
): RuntimeVal {
	const val = env.lookupVar(ident.symbol);
	return val;
}

export const stringLookUpTable = new Map<string, RuntimeVal>();
export const numberLookUpTable = new Map<string, RuntimeVal>();
export const moduleLookUpTable = new Map<string, RuntimeVal>();
export const booleanLookUpTable = new Map<string, RuntimeVal>();
export const arrayLookUpTable = new Map<string, RuntimeVal>();
export const functionLookUpTable = new Map<string, RuntimeVal>();
export const nullLookUpTable = new Map<string, RuntimeVal>();

export function eval_identifier(
	ident: Identifier,
	env: Enviroment
): RuntimeVal {
	const val = env.lookupVar(ident.symbol);
	console.log("val", val);
	return val;
}

export function eval_member_expr(
	member: MemberExpr,
	env: Enviroment
): RuntimeVal {
	// String, Number, Boolean, Object
	const object = evaluate(member.object, env) as RuntimeVal;

	switch (object.type) {
		case "object":
			const objectCase = object as ObjectVal;
			// console.log("Object\n", objectCase.properties)

			const objectProperty = member.property as Identifier
			// console.log("Property\n", objectProperty)
			// console.log("Computed\n", member.computed)

			if (!objectProperty || objectProperty.kind !== "Identifier") {
				throw error(`cannot resolve Object of: '${member.property.kind}' as it does not exist!`)
			}

			const objectValue = objectCase.properties.get(objectProperty.symbol)
			// console.log("value\n", objectValue)

			if (objectValue === undefined) {
				throw error(`Cannot resolve Object of: '${objectProperty.symbol}' as it does not exist!`)
			}

			return objectValue;

		case "string":
			// Not fully working
			const stringCase = object as StringVal;
			// console.log("string", stringCase)

			const stringProperty = member.property as Identifier
			// console.log("property", stringProperty)


			if (!stringLookUpTable.has(stringProperty.symbol)) {
				throw error(`Connot resolve String of: '${stringCase.type}' as it does not exist! 2`)
			}

			const staticMethod = stringLookUpTable.get(stringProperty.symbol) as NativeFunctionVal;
			// console.log(staticMethod)

			if (!staticMethod) {
				throw error(`Connot resolve String of: '${stringCase.type}' as it does not exist! 2`)
			}

			const fn = staticMethod.call as StaticFunctionCall;

			const clouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return fn(stringCase)
			})
			return clouser;

		case "boolean":
			const booleanCase = object as BooleanVal;
			// console.log("boolean", booleanCase)

			const booleanProperty = member.property as Identifier
			// console.log("property", booleanProperty)

			if (!booleanLookUpTable.has(booleanProperty.symbol)) {
				throw error(`Connot resolve Boolean of: '${booleanCase.type}' as it does not exist! 2`)
			}

			const booleanMethod = booleanLookUpTable.get(booleanProperty.symbol) as NativeFunctionVal;
			// console.log(booleanMethod)

			if (!booleanMethod) {
				throw error(`Connot resolve Boolean of: '${booleanCase.type}' as it does not exist! 2`)
			}

			const booleanFn = booleanMethod.call as StaticFunctionCall;

			const booleanClouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return booleanFn(booleanCase)
			})

			return booleanClouser;

		case "number":
			const numberCase = object as NumberVal;
			// console.log("number", numberCase)

			const numberProperty = member.property as Identifier
			// console.log("property", numberProperty)

			if (!numberLookUpTable.has(numberProperty.symbol)) {
				throw error(`Connot resolve Number of: '${numberCase.type}' as it does not exist! 2`)
			}

			const numberMethod = numberLookUpTable.get(numberProperty.symbol) as NativeFunctionVal;
			// console.log(numberMethod)

			if (!numberMethod) {
				throw error(`Connot resolve Number of: '${numberCase.type}' as it does not exist! 2`)
			}

			const numberFn = numberMethod.call as StaticFunctionCall;

			const numberClouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return numberFn(numberCase)
			})

			return numberClouser;

		case "array":
			const arrayCase = object as ArrayVal;
			// console.log("array", arrayCase)

			const arrayProperty = member.property as Identifier
			// console.log("property", arrayProperty)

			if (!arrayLookUpTable.has(arrayProperty.symbol)) {
				throw error(`Connot resolve Array of: '${arrayCase.type}' as it does not exist! 2`)
			}

			const arrayMethod = arrayLookUpTable.get(arrayProperty.symbol) as NativeFunctionVal;

			if (!arrayMethod) {
				throw error(`Connot resolve Array of: '${arrayCase.type}' as it does not exist! 2`)
			}

			const arrayFn = arrayMethod.call as StaticFunctionCall;

			const arrayClouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return arrayFn(arrayCase)
			})

			return arrayClouser;

		case "module":
			const moduleCase = object as ModuleVal;
			console.log("module", moduleCase)

			const moduleProperty = member.property as Identifier
			console.log("property", moduleProperty)

			if (!moduleLookUpTable.has(moduleProperty.symbol)) {
				throw error(`Connot resolve '${moduleCase.type}' as it does not exist! 2`)
			}

			const moduleMethod = moduleLookUpTable.get(moduleProperty.symbol) as NativeFunctionVal;
			console.log(moduleMethod)

			if (!moduleMethod) {
				throw error(`Connot resolve '${moduleCase.type}' as it does not exist! 2`)
			}

			const moduleFn = moduleMethod.call as StaticFunctionCall;

			const moduleClouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return moduleFn(moduleCase)
			})

			return moduleClouser;

		case "function":
			const functionCase = object as FunctionVal;
			// console.log("function", functionCase)

			const functionProperty = member.property as Identifier
			// console.log("property", functionProperty)

			if (!functionLookUpTable.has(functionProperty.symbol)) {
				throw error(`Connot resolve Function of: '${functionCase.type}' as it does not exist! 2`)
			}

			const functionMethod = functionLookUpTable.get(functionProperty.symbol) as NativeFunctionVal;

			if (!functionMethod) {
				throw error(`Connot resolve Function of: '${functionCase.type}' as it does not exist! 2`)
			}

			const functionFn = functionMethod.call as StaticFunctionCall;

			const functionClouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return functionFn(functionCase)
			})

			return functionClouser;

		case "null":
			const nullCase = object as NullVal;
			// console.log("null", nullCase)

			const nullProperty = member.property as Identifier
			// console.log("property", nullProperty)

			if (!nullLookUpTable.has(nullProperty.symbol)) {
				throw error(`Connot resolve NULL of: '${nullCase.type}' as it does not exist! 2`)
			}

			const nullMethod = nullLookUpTable.get(nullProperty.symbol) as NativeFunctionVal;

			if (!nullMethod) {
				throw error(`Connot resolve NUll of: '${nullCase.type}' as it does not exist! 2`)
			}

			const nullFn = nullMethod.call as StaticFunctionCall;

			const nullClouser = MK_NATIVE_FUNCTION((args: RuntimeVal[], env: Enviroment) => {
				return nullFn(nullCase)
			})

			return nullClouser;

		default:
			throw error(`Cannot resolve '${member.object.kind}' as it does not exist!`)
	}
}

export function eval_object_expr(
	obj: ObjectLiteral,
	env: Enviroment
): ObjectVal {
	const properties = new Map<string, RuntimeVal>();
	for (const property of obj.properties) {
		const runtimeVal =
			property.value === undefined
				? env.lookupVar(property.key)
				: evaluate(property.value, env);

		properties.set(property.key, runtimeVal);
	}
	return { type: "object", properties } as ObjectVal;
}

export function eval_call_expr(expr: CallExpr, env: Enviroment): RuntimeVal {
	const args = expr.args.map((arg) => evaluate(arg, env));
	const func = evaluate(expr.caller, env);

	if (func.type == "native-function") {
		const result = (func as NativeFunctionVal).call(args as unknown as RuntimeVal[] & RuntimeVal, env);
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
	error(`invalid function call ${JSON.stringify(expr)}`);
	return MK_NULL();
}

export function eval_assingment(
	node: AssignmentExpr,
	env: Enviroment
): RuntimeVal {
	if (node.assingee.kind !== "Identifier") {
		error(`invalid assingment target ${JSON.stringify(node.assingee)}`);
	}
	const varname = (node.assingee as Identifier).symbol;
	return env.assignVar(varname, evaluate(node.value, env));
}

export function eval_ternary_expr(
	node: TernaryExpr,
	env: Enviroment
): RuntimeVal {
	const condition = evaluate(node.condition, env);
	if (condition.type !== "boolean") {
		error(`invalid condition type ${condition.type}`);
	}

	// console.log("condition", condition)
	// console.log("then", node.thenExpr)
	// console.log("else", node.elseExpr)

	return condition.value
		? evaluate(node.thenExpr, env)
		: evaluate(node.elseExpr, env);
}
