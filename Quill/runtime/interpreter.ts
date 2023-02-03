import { RuntimeVal, NumberVal } from "./values.ts";

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
} from "../FrontEnd/ast.ts";

import {
  enal_identifier,
  eval_and_expr,
  eval_assingment,
  eval_binary_expr,
  eval_call_expr,
  eval_equal_expr,
  eval_greater_than_expr,
  eval_less_than_expr,
  eval_member_expr,
  eval_not_equal_expr,
  eval_object_expr,
  eval_or_expr,
} from "./eval/expressions.ts";

import {
  eval_function_decl,
  eval_program,
  eval_var_decl,
  eval_return_stmt,
  eval_if_stmt,
  eval_elif_stmt,
} from "./eval/statements.ts";

import Enviroment from "./enviroment.ts";
import * as tracer from "../FrontEnd/tracing.ts";

export function evaluate(astNode: Stmt, env: Enviroment): RuntimeVal {
  // tracer.trace("Evaluating ast node: " + tracer.format(astNode.kind));
  // tracer.trace("Enviroment: "  + tracer.format(env));
  if (!astNode) {
    throw Error("Invalid AST node: " + astNode);
  }

  switch (astNode.kind) {
    case "NumericLiteral":
      return {
        value: (astNode as NumericLiteral).value,
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

    case "EqualsExpr":
      return eval_equal_expr(astNode as EqualsExpr, env);

    case "NotEqualsExpr":
      return eval_not_equal_expr(astNode as NotEqualsExpr, env);

    case "AndExpr":
      return eval_and_expr(astNode as AndExpr, env);

    case "OrExpr":
      return eval_or_expr(astNode as OrExpr, env);

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

    case "ElifStmt":
      return eval_elif_stmt(astNode as ElifStmt, env);

    case "ArrayLiteral":
      throw tracer.error("Array are not yet implemented");

    // Handle unimplemented ast nodes
    default:
      tracer.error(
        "This ast node has not yet been set up for inter." + astNode.kind
      );
      Deno.exit(0);
  }
}
