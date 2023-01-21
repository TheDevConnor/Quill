import { RuntimeVal, NumberVal } from "./values.ts";
import { Stmt, NumericLiteral, Identifier, 
		 BinaryExpr, Program, VarDeclaration, AssignmentExpr, 
		 ObjectLiteral, CallExpr, FunctionDeclaration, ReturnStmt, 
<<<<<<< HEAD
		 IfStmt } from "../FrontEnd/ast.ts";
import { enal_identifier,eval_assingment,eval_binary_expr, eval_call_expr, eval_object_expr } from "./eval/expressions.ts";
import { eval_function_decl, eval_program,eval_var_decl, eval_return_stmt } from "./eval/statements.ts";
=======
		 GreaterThanExpr, LessThanExpr, IfStmt } from "../FrontEnd/ast.ts";
import { enal_identifier,eval_assingment,eval_binary_expr, eval_call_expr, eval_greater_than_expr, eval_less_than_expr, eval_object_expr } from "./eval/expressions.ts";
import { eval_function_decl, eval_program,eval_var_decl, eval_return_stmt, eval_if_stmt } from "./eval/statements.ts";
>>>>>>> parent of ef65484 (IT WORKS you can get the info from an if stmt)
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

		case "ReturnStmt":
			return eval_return_stmt(astNode as ReturnStmt, env);

		case "IfStmt":
			return eval_if_stmt(astNode as IfStmt, env);

		// Handle unimplemented ast nodes
		default:
			console.error("This ast node has not yet been set up for inter.", astNode);
		Deno.exit(0);
	}
}

