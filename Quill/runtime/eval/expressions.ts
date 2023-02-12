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
} from "../values.ts";

import Enviroment from "../enviroment.ts";
import { evaluate } from "../interpreter.ts";
import { error, info, debug, trace } from "../../FrontEnd/tracing.ts";

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

  return { value: result, type: "number", property: null } as NumberVal;
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

export function eval_member_expr(
  member: MemberExpr,
  env: Enviroment
): RuntimeVal {
  error("eval_member_expr not implemented");

  return MK_NULL();
}

export function eval_object_expr(
  obj: ObjectLiteral,
  env: Enviroment,
): RuntimeVal {
  const object = { type: "object", properties: new Map() } as ObjectVal;
  for (const { key, value } of obj.properties) {
    const runtimeVal = (value == undefined)
      ? env.lookupVar(key)
      : evaluate(value, env);

    object.properties.set(key, runtimeVal);
  }

  return object;
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

export function eval_call_expr(expr: CallExpr, env: Enviroment): RuntimeVal {
  const args = expr.args.map((arg) => evaluate(arg, env));
  const func = evaluate(expr.caller, env);

  if (func.type == "native-function") {
    const result = (func as NativeFunctionVal).call(args, env);
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
