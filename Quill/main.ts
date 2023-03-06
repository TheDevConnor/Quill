import Parser from "./FrontEnd/parser.ts";
import { createGlobalENV } from "./runtime/enviroment.ts";
import { evaluate } from "./runtime/interpreter.ts";

runTime("./test.ql")
// rtt();

async function runTime(filename: string) {
    const parser = new Parser();
    const env = createGlobalENV();

    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);
    const result = evaluate(program, env);
    // console.log(result);
}

function rtt() {
    const parser = new Parser();
    const env = createGlobalENV();

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


        const result = evaluate(program, env);
        console.log(result);
    }
}
