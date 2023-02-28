import {
  FunctionDeclaration,
  Program,
  ReturnStmt,
  VarDeclaration,
  IfStmt,
  ElifStmt,
  ArrayLiteral,
  WhileStmt,
  ForStmt,
  ElseStmt,
  ImportStmt,
} from "../../FrontEnd/ast.ts";

import { RuntimeVal, MK_NULL, FunctionVal, ArrayVal, ObjectVal, NativeFunctionVal } from "../values.ts";
import Enviroment from "../enviroment.ts";
import { debug, error } from "../../FrontEnd/tracing.ts";

import Parser from "../../FrontEnd/parser.ts";
import { createGlobalENV } from "../enviroment.ts";
import { evaluate } from "../interpreter.ts";

export function eval_program(program: Program, env: Enviroment): RuntimeVal {
  let lastEvaluated: RuntimeVal = MK_NULL();
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}

export async function eval_import_stmt (stmt: ImportStmt) {
  // 1: consturct the module path
  // 2: Add the new module to the gloable scope
  // 3: Declare the module in the global scope

  const parser = new Parser();
  const env = createGlobalENV();

  const input = await Deno.readTextFile(stmt.fileName);
  // console.log(input);
  const program = parser.produceAST(input);
  // console.log(program);
  
  const module = { type: "module", name: stmt.name, value: program.body } as unknown as ObjectVal;
  // console.log(module);

  const result = env.declareVar(stmt.name, module, false)
  console.log(result)

  return result
}

export function eval_var_decl(
  declaration: VarDeclaration,
  env: Enviroment
): RuntimeVal {
  const value = declaration.value
    ? evaluate(declaration.value, env)
    : MK_NULL();
  return env.declareVar(declaration.identifier, value, declaration.constant);
}

export function eval_return_stmt(
  stmt: ReturnStmt,
  env: Enviroment
): RuntimeVal {
  return evaluate(stmt.value, env);
}

export function eval_if_stmt(stmt: IfStmt, env: Enviroment): RuntimeVal {
  const condition = evaluate(stmt.condition, env);
  if (condition.value) {
    for (const statement of stmt.thenBranch) {
      evaluate(statement, env);
    }
  } else if (stmt.elifBranch) {
    for (const elif of stmt.elifBranch) {
      eval_elif_stmt(elif, env);
    }
  } else {
    if (stmt.elseBranch) {
      for (const statement of stmt.elseBranch) {
        eval_else_stmt(statement, env);
      }
    }
  }
  return MK_NULL();
}

export function eval_elif_stmt(stmt: ElifStmt, env: Enviroment): RuntimeVal {
  const condition = evaluate(stmt.condition, env);
  if (condition.value) {
    for (const statement of stmt.body) {
      evaluate(statement, env);
    }
  } else {
    if (stmt.elseBranch) {
      for (const statement of stmt.elseBranch) {
        eval_else_stmt(statement, env);
      }
    }
  }
  return MK_NULL();
}

export function eval_else_stmt(stmt: ElseStmt, env: Enviroment): RuntimeVal {
  for (const statement of stmt.body) {
    evaluate(statement, env);
  }
  return MK_NULL();
}

export function eval_function_decl(
  declaration: FunctionDeclaration,
  env: Enviroment
): RuntimeVal {
  // Create new function scope

  const func = {
    type: "function",
    name: declaration.name,
    parameters: declaration.parameters,
    declarationsENV: env,
    async: declaration.async,
    body: declaration.body,
  } as unknown as FunctionVal;

  return env.declareVar(declaration.name, func, true);
}

export function eval_while_stmt(stmt: WhileStmt, env: Enviroment): RuntimeVal {
  let condition = evaluate(stmt.condition, env);
  while (condition.value) {
    for (const statement of stmt.body) {
      evaluate(statement, env);
    }
    condition = evaluate(stmt.condition, env);
  }
  return MK_NULL();
}

export function eval_for_stmt(stmt: ForStmt, env: Enviroment): RuntimeVal {
  evaluate(stmt.init, env);
  let condition = evaluate(stmt.condition, env);
  const increment = stmt.increment;

  while (condition.value) {
    for (const statement of stmt.body) {
      evaluate(statement, env);
    }
    increment;
    condition = evaluate(stmt.condition, env);
  }
  return MK_NULL();
}

export function eval_array_literal(
  declaration: ArrayLiteral,
  env: Enviroment
): RuntimeVal {
  const values = declaration.elements.map((element) => evaluate(element, env));
  const array = {
    type: "array",
    value: values,
  } as ArrayVal;

  return env.declareVar(declaration.name, array, false);
}

export function eval_pull_literal(
  declaration: ArrayLiteral,
  env: Enviroment
): RuntimeVal {
  const values = declaration.elements.map((element) => evaluate(element, env));
  const array = {
    type: "array",
    value: values,
  } as ArrayVal;

  return array;
}
