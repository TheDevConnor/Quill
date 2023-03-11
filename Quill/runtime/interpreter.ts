// deno-lint-ignore-file
import { RuntimeVal, NumberVal, StringVal } from "./values.ts";

import {
	Stmt,
	NumericLiteral,
	Identifier,
	BinaryExpr,
	Program,
	VarDeclaration,
	AssignmentExpr,
	ObjectLiteral,
	CallExpr,
	FunctionDeclaration,
	ReturnStmt,
	GreaterThanExpr,
	LessThanExpr,
	IfStmt,
	MemberExpr,
	EqualsExpr,
	NotEqualsExpr,
	OrExpr,
	AndExpr,
	ElifStmt,
	ArrayLiteral,
	PlusEqualsExpr,
	MinusEqualsExpr,
	WhileStmt,
	GreaterThanOrEqualsExpr,
	LessThanOrEqualsExpr,
	ForStmt,
	ElseStmt,
	StringLiteral,
	ImportStmt,
	TernaryExpr,
	GenericFunctionDeclaration,
} from "../frontend/ast.ts";

import {
	enal_identifier,
	eval_and_expr,
	eval_assingment,
	eval_binary_expr,
	eval_call_expr,
	eval_equal_expr,
	eval_greater_than_expr,
	eval_greater_than_or_equals_expr,
	eval_less_than_expr,
	eval_less_than_or_equals_expr,
	eval_member_expr,
	eval_minus_equals_expr,
	eval_not_equal_expr,
	eval_object_expr,
	eval_or_expr,
	eval_plus_equals_expr,
	eval_ternary_expr,
} from "./eval/expressions.ts";

import {
	eval_function_decl,
	eval_program,
	eval_var_decl,
	eval_return_stmt,
	eval_if_stmt,
	eval_elif_stmt,
	eval_while_stmt,
	eval_for_stmt,
	eval_else_stmt,
	eval_array_literal,
	eval_import_stmt,
	eval_generic_decl,
} from "./eval/statements.ts";

import Enviroment from "./enviroment.ts";
import * as tracer from "../util/tracing.ts";

export function evaluate(astNode: Stmt, env: Enviroment): RuntimeVal {
	// tracer.trace("Evaluating ast node: " + tracer.format(astNode.kind));
	// tracer.trace("Enviroment: "  + tracer.format(env));
	if (!astNode) {
		tracer.error("Invalid AST node: " + astNode);
	}

	switch (astNode.kind) {
		case "NumericLiteral":
			return {
				value: (astNode as NumericLiteral).value,
				type: "number",
			} as NumberVal;

		case "StringLiteral":
			return {
				value: (astNode as StringLiteral).value,
				type: "string",
			} as unknown as StringVal;

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

		case "GreaterThanExpr":
			return eval_greater_than_expr(astNode as GreaterThanExpr, env);

		case "GreaterThanOrEqualsExpr":
			return eval_greater_than_or_equals_expr(
				astNode as GreaterThanOrEqualsExpr,
				env
			);

		case "LessThanExpr":
			return eval_less_than_expr(astNode as LessThanExpr, env);

		case "LessThanOrEqualsExpr":
			return eval_less_than_or_equals_expr(
				astNode as LessThanOrEqualsExpr,
				env
			);

		case "EqualsExpr":
			return eval_equal_expr(astNode as EqualsExpr, env);

		case "NotEqualsExpr":
			return eval_not_equal_expr(astNode as NotEqualsExpr, env);

		case "AndExpr":
			return eval_and_expr(astNode as AndExpr, env);

		case "PlusEqualsExpr":
			return eval_plus_equals_expr(astNode as PlusEqualsExpr, env);

		case "MinusEqualsExpr":
			return eval_minus_equals_expr(astNode as MinusEqualsExpr, env);

		case "OrExpr":
			return eval_or_expr(astNode as OrExpr, env);

		// Handle programs
		case "Program":
			return eval_program(astNode as Program, env);

		case "MemberExpr":
			return eval_member_expr(astNode as MemberExpr, env);

		// Handle statements
		case "VarDeclaration":
			return eval_var_decl(astNode as VarDeclaration, env);

		case "FunctionDeclaration":
			return eval_function_decl(astNode as FunctionDeclaration, env);

		case "ReturnStmt":
			return eval_return_stmt(astNode as ReturnStmt, env);

		case "IfStmt":
			return eval_if_stmt(astNode as IfStmt, env);

		case "ElifStmt":
			return eval_elif_stmt(astNode as ElifStmt, env);

		case "ElseStmt":
			return eval_else_stmt(astNode as ElseStmt, env);

		case "WhileStmt":
			return eval_while_stmt(astNode as WhileStmt, env);

		case "ForStmt":
			return eval_for_stmt(astNode as ForStmt, env);

		case "ArrayLiteral":
			return eval_array_literal(astNode as ArrayLiteral, env);

		case "ObjectLiteral":
			return eval_object_expr(astNode as ObjectLiteral, env);

		case "ImportStmt":
			return eval_import_stmt(astNode as ImportStmt, env) as unknown as RuntimeVal;

		case "TernaryExpr":
			return eval_ternary_expr(astNode as TernaryExpr, env);

		case "GenericFunctionDeclaration":
			return eval_generic_decl(astNode as GenericFunctionDeclaration, env)

		// Handle unimplemented ast nodes
		default:
			tracer.error(
				"This ast node has not yet been set up for interpretation." + astNode.kind
			);
			Deno.exit(0);
	}
}
