import Enviroment from "../enviroment.ts";
import { evaluate } from "../interpreter.ts";
import { RuntimeVal,MK_NULL } from "../values.ts";
import { Program, VarDeclaration } from "../../FrontEnd/ast.ts";

export function eval_program(program: Program, env: Enviroment): RuntimeVal {
	let lastEvaluated: RuntimeVal = MK_NULL();
	for (const statement of program.body){
		lastEvaluated = evaluate(statement, env);
	}
	return lastEvaluated;
}

export function eval_var_decl(
    declaration: VarDeclaration,
    env: Enviroment
	): RuntimeVal {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
        return env.declareVar(declaration.identifier, value, declaration.constant);
}