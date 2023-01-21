import { RuntimeVal, NumberVal, MK_NULL } from "./values.ts"
;
import { Stmt, NumericLiteral, Identifier, 
		 BinaryExpr, Program, VarDeclaration, AssignmentExpr, 
		 ObjectLiteral, CallExpr, FunctionDeclaration, ReturnStmt, 
		 GreaterThanExpr, LessThanExpr, IfStmt, MemberExpr } from "../FrontEnd/ast.ts";

import { enal_identifier,eval_assingment,eval_binary_expr, 
	eval_call_expr, eval_greater_than_expr, eval_less_than_expr, 
	eval_member_expr, eval_object_expr } from "./eval/expressions.ts";
	
import { eval_function_decl, eval_program,eval_var_decl, eval_return_stmt } from "./eval/statements.ts";
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

		case "MemberExpr":
			return eval_member_expr(astNode as MemberExpr, env);

		case "AssignmentExpr":
			return eval_assingment(astNode as AssignmentExpr, env);

		case "GreaterThanExpr":
			return eval_greater_than_expr(astNode as GreaterThanExpr, env);

		case "LessThanExpr":
			return eval_less_than_expr(astNode as LessThanExpr, env);

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
			const condition = evaluate((astNode as IfStmt).condition, env);
			if (condition.value) {
				const body = (astNode as IfStmt).thenBranch;
				for (const statement of body) {
					evaluate(statement, env);
				}
			}
			return MK_NULL();

		// Handle unimplemented ast nodes
		default:
			console.error("This ast node has not yet been set up for inter.", astNode);
		Deno.exit(0);
	}
}