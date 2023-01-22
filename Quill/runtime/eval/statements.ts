import { FunctionDeclaration, Program, ReturnStmt, VarDeclaration, IfStmt } from "../../FrontEnd/ast.ts";
import { RuntimeVal,MK_NULL, FunctionVal } from "../values.ts";
import { evaluate } from "../interpreter.ts";
import Enviroment from "../enviroment.ts";

export function eval_program(program: Program, env: Enviroment): RuntimeVal {
	let lastEvaluated: RuntimeVal = MK_NULL();
	for (const statement of program.body){
		lastEvaluated = evaluate(statement, env);
	}
	return lastEvaluated;
}

export function eval_var_decl(declaration: VarDeclaration, env: Enviroment): RuntimeVal {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
	return env.declareVar(declaration.identifier, value, declaration.constant);
}

export function eval_return_stmt(stmt: ReturnStmt, env: Enviroment): RuntimeVal {
	return evaluate(stmt.value, env);
}

export function eval_if_stmt(stmt: IfStmt, env: Enviroment): RuntimeVal {
	const condition = evaluate((stmt as IfStmt).condition, env);
	if (condition.value) {
		const body = (stmt as IfStmt).thenBranch;
		for (const statement of body) {
			evaluate(statement, env);
		}
	} else {
		if ((stmt as IfStmt).elseBranch !== undefined){
			for (const statement of (stmt as IfStmt).elseBranch) {
				evaluate(statement, env);
			}
		}
	}
	return MK_NULL();
}

export function eval_function_decl(declaration: FunctionDeclaration, env: Enviroment): RuntimeVal {
	// Create new function scope

	const func = {
		type: "function",
		name: declaration.name,
		parameters: declaration.parameters,
		declarationsENV: env,
		body: declaration.body,
	} as FunctionVal;

	return env.declareVar(declaration.name, func, true);
}
