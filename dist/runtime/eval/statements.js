"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eval_pull_literal = exports.eval_array_literal = exports.eval_for_stmt = exports.eval_while_stmt = exports.eval_function_decl = exports.eval_else_stmt = exports.eval_elif_stmt = exports.eval_if_stmt = exports.eval_return_stmt = exports.eval_var_decl = exports.eval_program = void 0;
const values_ts_1 = require("../values.ts");
const interpreter_ts_1 = require("../interpreter.ts");
function eval_program(program, env) {
    let lastEvaluated = (0, values_ts_1.MK_NULL)();
    for (const statement of program.body) {
        lastEvaluated = (0, interpreter_ts_1.evaluate)(statement, env);
    }
    return lastEvaluated;
}
exports.eval_program = eval_program;
function eval_var_decl(declaration, env) {
    const value = declaration.value
        ? (0, interpreter_ts_1.evaluate)(declaration.value, env)
        : (0, values_ts_1.MK_NULL)();
    return env.declareVar(declaration.identifier, value, declaration.constant);
}
exports.eval_var_decl = eval_var_decl;
function eval_return_stmt(stmt, env) {
    return (0, interpreter_ts_1.evaluate)(stmt.value, env);
}
exports.eval_return_stmt = eval_return_stmt;
function eval_if_stmt(stmt, env) {
    const condition = (0, interpreter_ts_1.evaluate)(stmt.condition, env);
    if (condition.value) {
        for (const statement of stmt.thenBranch) {
            (0, interpreter_ts_1.evaluate)(statement, env);
        }
    }
    else if (stmt.elifBranch) {
        for (const elif of stmt.elifBranch) {
            eval_elif_stmt(elif, env);
        }
    }
    else {
        if (stmt.elseBranch) {
            for (const statement of stmt.elseBranch) {
                eval_else_stmt(statement, env);
            }
        }
    }
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_if_stmt = eval_if_stmt;
function eval_elif_stmt(stmt, env) {
    const condition = (0, interpreter_ts_1.evaluate)(stmt.condition, env);
    if (condition.value) {
        for (const statement of stmt.body) {
            (0, interpreter_ts_1.evaluate)(statement, env);
        }
    }
    else {
        if (stmt.elseBranch) {
            for (const statement of stmt.elseBranch) {
                eval_else_stmt(statement, env);
            }
        }
    }
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_elif_stmt = eval_elif_stmt;
function eval_else_stmt(stmt, env) {
    for (const statement of stmt.body) {
        (0, interpreter_ts_1.evaluate)(statement, env);
    }
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_else_stmt = eval_else_stmt;
function eval_function_decl(declaration, env) {
    // Create new function scope
    const func = {
        type: "function",
        name: declaration.name,
        parameters: declaration.parameters,
        declarationsENV: env,
        async: declaration.async,
        body: declaration.body,
    };
    return env.declareVar(declaration.name, func, true);
}
exports.eval_function_decl = eval_function_decl;
function eval_while_stmt(stmt, env) {
    let condition = (0, interpreter_ts_1.evaluate)(stmt.condition, env);
    while (condition.value) {
        for (const statement of stmt.body) {
            (0, interpreter_ts_1.evaluate)(statement, env);
        }
        condition = (0, interpreter_ts_1.evaluate)(stmt.condition, env);
    }
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_while_stmt = eval_while_stmt;
function eval_for_stmt(stmt, env) {
    (0, interpreter_ts_1.evaluate)(stmt.init, env);
    let condition = (0, interpreter_ts_1.evaluate)(stmt.condition, env);
    const increment = stmt.increment;
    while (condition.value) {
        for (const statement of stmt.body) {
            (0, interpreter_ts_1.evaluate)(statement, env);
        }
        increment;
        condition = (0, interpreter_ts_1.evaluate)(stmt.condition, env);
    }
    return (0, values_ts_1.MK_NULL)();
}
exports.eval_for_stmt = eval_for_stmt;
function eval_array_literal(declaration, env) {
    const values = declaration.elements.map((element) => (0, interpreter_ts_1.evaluate)(element, env));
    const array = {
        type: "array",
        value: values,
    };
    return env.declareVar(declaration.name, array, false);
}
exports.eval_array_literal = eval_array_literal;
function eval_pull_literal(declaration, env) {
    const values = declaration.elements.map((element) => (0, interpreter_ts_1.evaluate)(element, env));
    const array = {
        type: "array",
        value: values,
    };
    return array;
}
exports.eval_pull_literal = eval_pull_literal;
//# sourceMappingURL=statements.js.map