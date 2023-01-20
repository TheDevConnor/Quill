import { RuntimeVal, NumberVal } from "./values.ts";
import { Stmt, NumericLiteral, Identifier, BinaryExpr, Program, VarDeclaration, AssignmentExpr, ObjectLiteral, CallExpr, FunctionDeclaration, Return, IfStatement } from "../FrontEnd/ast.ts";
import { enal_identifier,eval_assingment,eval_binary_expr, eval_call_expr, eval_object_expr } from "./eval/expressions.ts";
import { eval_function_decl, eval_program,eval_return,eval_var_decl } from "./eval/statements.ts";
import Enviroment from "./enviroment.ts";

export function evaluate (astNode: Stmt, env: Enviroment): RuntimeVal {
	switch (astNode.kind) {
		case "NumericLiteral":
			return { 
				value: ((astNode as NumericLiteral).value),
				type: "number",
			} as NumberVal;

		case "Identifier":
			return enal_identifier(astNode as Identifier, env);

		case "ObjectLiteral":
			return eval_object_expr(astNode as ObjectLiteral, env);

		case "CallExpr":
				return eval_call_expr(astNode as CallExpr, env);

		case "BinaryExpr":
			return eval_binary_expr(astNode as BinaryExpr, env);

		case "AssignmentExpr":
			return eval_assingment(astNode as AssignmentExpr, env);

		case "Program":
			return eval_program(astNode as Program, env);
		
		// Handle statements
		case "VarDeclaration":
			return eval_var_decl(astNode as VarDeclaration, env);

		case "FunctionDeclaration":
			return eval_function_decl(astNode as FunctionDeclaration, env);

		case "Return":
			return eval_return(astNode as Return, env);
<<<<<<< HEAD
<<<<<<< HEAD

		case "IfStatement": {
			const { test, consequent, alternate } = astNode as IfStatement;
			const testValue = evaluate(test, env);
			if (testValue) {
				return evaluate(consequent, env);
			} else if (alternate) {
				return evaluate(alternate, env);
			}
			break;
		}

=======
			
>>>>>>> parent of 7105b5f (Added in different typs of print statements)
=======
			
>>>>>>> parent of 7105b5f (Added in different typs of print statements)
		// Handle unimplemented ast nodes
		default:
			console.error("This ast node has not yet been set up for inter.", astNode);
		Deno.exit(0);
	}
}

