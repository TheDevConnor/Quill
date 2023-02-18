"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eval_call_expr = exports.eval_assingment = exports.eval_object_expr = exports.eval_member_expr = exports.enal_identifier = exports.eval_minus_equals_expr = exports.eval_plus_equals_expr = exports.eval_or_expr = exports.eval_and_expr = exports.eval_not_equal_expr = exports.eval_equal_expr = exports.eval_less_than_or_equals_expr = exports.eval_less_than_expr = exports.eval_greater_than_or_equals_expr = exports.eval_greater_than_expr = exports.eval_binary_expr = void 0;
const values_ts_1 = require("../values.ts");
const enviroment_ts_1 = __importDefault(require("../enviroment.ts"));
const interpreter_ts_1 = require("../interpreter.ts");
const tracing_ts_1 = require("../../FrontEnd/tracing.ts");
function eval_numeric_binary_expr(leftHandSide, rightHandSide, operator) {
    let result;
    if (operator == "+") {
        result = leftHandSide.value + rightHandSide.value;
    }
    else if (operator == "-") {
        result = leftHandSide.value - rightHandSide.value;
    }
    else if (operator == "*") {
        result = leftHandSide.value * rightHandSide.value;
    }
    else if (operator == "/") {
        result = leftHandSide.value / rightHandSide.value;
    }
    else if (operator == "<") {
        result = leftHandSide.value < rightHandSide.value ? 1 : 0;
    }
    else if (operator == ">") {
        result = leftHandSide.value > rightHandSide.value ? 1 : 0;
    }
    else if (operator == "<=") {
        result = leftHandSide.value <= rightHandSide.value ? 1 : 0;
    }
    else if (operator == ">=") {
        result = leftHandSide.value >= rightHandSide.value ? 1 : 0;
    }
    else if (operator == "==") {
        result = leftHandSide.value == rightHandSide.value ? 1 : 0;
    }
    else if (operator == "!=") {
        result = leftHandSide.value != rightHandSide.value ? 1 : 0;
    }
    else {
        result = leftHandSide.value % rightHandSide.value;
    }
    return { value: result, type: "number" };
}
function eval_binary_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        return eval_numeric_binary_expr(leftHandSide, rightHandSide, binop.operator);
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_binary_expr = eval_binary_expr;
function eval_greater_than_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = leftHandSide.value > rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_greater_than_expr = eval_greater_than_expr;
function eval_greater_than_or_equals_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = leftHandSide.value >= rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_greater_than_or_equals_expr = eval_greater_than_or_equals_expr;
function eval_less_than_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = leftHandSide.value < rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_less_than_expr = eval_less_than_expr;
function eval_less_than_or_equals_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = leftHandSide.value <= rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_less_than_or_equals_expr = eval_less_than_or_equals_expr;
function eval_equal_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = leftHandSide.value == rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_equal_expr = eval_equal_expr;
function eval_not_equal_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = leftHandSide.value != rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_not_equal_expr = eval_not_equal_expr;
function eval_and_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "boolean" && rightHandSide.type == "boolean") {
        const result = leftHandSide.value && rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_and_expr = eval_and_expr;
function eval_or_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "boolean" && rightHandSide.type == "boolean") {
        const result = leftHandSide.value || rightHandSide.value;
        return { value: result, type: "boolean" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_or_expr = eval_or_expr;
function eval_plus_equals_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = (leftHandSide.value += rightHandSide.value);
        return { value: result, type: "number" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_plus_equals_expr = eval_plus_equals_expr;
function eval_minus_equals_expr(binop, env) {
    const leftHandSide = (0, interpreter_ts_1.evaluate)(binop.left, env);
    const rightHandSide = (0, interpreter_ts_1.evaluate)(binop.right, env);
    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        const result = (leftHandSide.value -= rightHandSide.value);
        return { value: result, type: "number" };
    }
    // One or both are null
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_minus_equals_expr = eval_minus_equals_expr;
function enal_identifier(ident, env) {
    const val = env.lookupVar(ident.symbol);
    return val;
}
exports.enal_identifier = enal_identifier;
function eval_member_expr(member, env) {
    const object = (0, interpreter_ts_1.evaluate)(member.object, env);
    if (!object || object.type !== "object") {
        throw (0, tracing_ts_1.error)(`Cannot resolve '${member.object.kind}' as it does not exist! 3`);
    }
    const property = member.property;
    if (!property || property.kind !== "Identifier") {
        throw (0, tracing_ts_1.error)(`Cannot resolve '${member.property.kind}' as it does not exist! 2`);
    }
    const value = object.properties.get(property.symbol);
    if (value === undefined) {
        throw (0, tracing_ts_1.error)(`Cannot resolve '${property.symbol}' as it does not exist! 1`);
    }
    return value;
}
exports.eval_member_expr = eval_member_expr;
function eval_object_expr(obj, env) {
    const properties = new Map();
    for (const property of obj.properties) {
        const runtimeVal = property.value === undefined
            ? env.lookupVar(property.key)
            : (0, interpreter_ts_1.evaluate)(property.value, env);
        properties.set(property.key, runtimeVal);
    }
    return { type: "object", properties };
}
exports.eval_object_expr = eval_object_expr;
function eval_assingment(node, env) {
    if (node.assingee.kind !== "Identifier") {
        (0, tracing_ts_1.error)(`invalid assingment target ${JSON.stringify(node.assingee)}`);
    }
    const varname = node.assingee.symbol;
    return env.assignVar(varname, (0, interpreter_ts_1.evaluate)(node.value, env));
}
exports.eval_assingment = eval_assingment;
function eval_call_expr(expr, env) {
    const args = expr.args.map((arg) => (0, interpreter_ts_1.evaluate)(arg, env));
    const func = (0, interpreter_ts_1.evaluate)(expr.caller, env);
    if (func.type == "native-function") {
        const result = func.call(args, env);
        return result;
    }
    if (func.type == "function") {
        const fn = func;
        const scope = new enviroment_ts_1.default(fn.declarationsENV);
        // Create the variables for the parameters list
        for (let i = 0; i < fn.parameters.length; i++) {
            // TODO: check the bonds here. Verify arity of function
            scope.declareVar(fn.parameters[i], args[i], false);
        }
        // Evaluate the function body
        let result = (0, values_ts_1.MK_NULL)();
        // Evaluate the function body line by line
        for (const statement of fn.body) {
            result = (0, interpreter_ts_1.evaluate)(statement, scope);
        }
        return result;
    }
    (0, tracing_ts_1.error)(`invalid function call ${JSON.stringify(expr)}`);
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_call_expr = eval_call_expr;
//# sourceMappingURL=expressions.js.map