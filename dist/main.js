"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_ts_1 = __importDefault(require("./FrontEnd/parser.ts"));
const enviroment_ts_1 = require("./runtime/enviroment.ts");
const interpreter_ts_1 = require("./runtime/interpreter.ts");
runTime("./test.ql");
// rtt();
async function runTime(filename) {
    const parser = new parser_ts_1.default();
    const env = (0, enviroment_ts_1.createGlobalENV)();
    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);
    const result = (0, interpreter_ts_1.evaluate)(program, env);
    // console.log(result);
}
function rtt() {
    const parser = new parser_ts_1.default();
    const env = (0, enviroment_ts_1.createGlobalENV)();
    console.log("\nQuill REPL v0.0.1");
    console.log("Type 'exit' to exit the REPL\n");
    // Continue Repl Until User Stops Or Types `exit`
    while (true) {
        const input = prompt(">>> ");
        // Check for no user or exit keyword
        if (!input || input.includes("exit")) {
            Deno.exit(1);
        }
        // Produce AST From sourc-code
        const program = parser.produceAST(input);
        const result = (0, interpreter_ts_1.evaluate)(program, env);
        console.log(result);
    }
}
//# sourceMappingURL=main.js.map