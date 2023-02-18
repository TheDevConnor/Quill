"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const expressions_ts_1 = require("./eval/expressions.ts");
const statements_ts_1 = require("./eval/statements.ts");
const tracer = __importStar(require("../FrontEnd/tracing.ts"));
function evaluate(astNode, env) {
    // tracer.trace("Evaluating ast node: " + tracer.format(astNode.kind));
    // tracer.trace("Enviroment: "  + tracer.format(env));
    if (!astNode) {
        tracer.error("Invalid AST node: " + astNode);
    }
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: astNode.value,
                type: "number",
            };
        case "StringLiteral":
            return {
                value: astNode.value,
                type: "string",
            };
        case "Identifier":
            return (0, expressions_ts_1.enal_identifier)(astNode, env);
        case "ObjectLiteral":
            return (0, expressions_ts_1.eval_object_expr)(astNode, env);
        case "CallExpr":
            return (0, expressions_ts_1.eval_call_expr)(astNode, env);
        case "BinaryExpr":
            return (0, expressions_ts_1.eval_binary_expr)(astNode, env);
        case "AssignmentExpr":
            return (0, expressions_ts_1.eval_assingment)(astNode, env);
        case "GreaterThanExpr":
            return (0, expressions_ts_1.eval_greater_than_expr)(astNode, env);
        case "GreaterThanOrEqualsExpr":
            return (0, expressions_ts_1.eval_greater_than_or_equals_expr)(astNode, env);
        case "LessThanExpr":
            return (0, expressions_ts_1.eval_less_than_expr)(astNode, env);
        case "LessThanOrEqualsExpr":
            return (0, expressions_ts_1.eval_less_than_or_equals_expr)(astNode, env);
        case "EqualsExpr":
            return (0, expressions_ts_1.eval_equal_expr)(astNode, env);
        case "NotEqualsExpr":
            return (0, expressions_ts_1.eval_not_equal_expr)(astNode, env);
        case "AndExpr":
            return (0, expressions_ts_1.eval_and_expr)(astNode, env);
        case "PlusEqualsExpr":
            return (0, expressions_ts_1.eval_plus_equals_expr)(astNode, env);
        case "MinusEqualsExpr":
            return (0, expressions_ts_1.eval_minus_equals_expr)(astNode, env);
        case "OrExpr":
            return (0, expressions_ts_1.eval_or_expr)(astNode, env);
        // Handle programs
        case "Program":
            return (0, statements_ts_1.eval_program)(astNode, env);
        case "MemberExpr":
            return (0, expressions_ts_1.eval_member_expr)(astNode, env);
        // Handle statements
        case "VarDeclaration":
            return (0, statements_ts_1.eval_var_decl)(astNode, env);
        case "FunctionDeclaration":
            return (0, statements_ts_1.eval_function_decl)(astNode, env);
        case "ReturnStmt":
            return (0, statements_ts_1.eval_return_stmt)(astNode, env);
        case "IfStmt":
            return (0, statements_ts_1.eval_if_stmt)(astNode, env);
        case "ElifStmt":
            return (0, statements_ts_1.eval_elif_stmt)(astNode, env);
        case "ElseStmt":
            return (0, statements_ts_1.eval_else_stmt)(astNode, env);
        case "WhileStmt":
            return (0, statements_ts_1.eval_while_stmt)(astNode, env);
        case "ForStmt":
            return (0, statements_ts_1.eval_for_stmt)(astNode, env);
        case "ArrayLiteral":
            return (0, statements_ts_1.eval_array_literal)(astNode, env);
        case "ObjectLiteral":
            return (0, expressions_ts_1.eval_object_expr)(astNode, env);
        // Handle unimplemented ast nodes
        default:
            tracer.error("This ast node has not yet been set up for interpretation." + astNode.kind);
            Deno.exit(0);
    }
}
exports.evaluate = evaluate;
//# sourceMappingURL=interpreter.js.map