import { exit } from "https://deno.land/std@0.171.0/node/process.ts";
import { createGlobalENV } from "./runtime/enviroment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { Parser } from "./frontend/parser.ts";

runTime("./test.ql")
// ql();

async function runTime(filename: string) {
    const parser = new Parser();
    const env = createGlobalENV();

    const input = await Deno.readTextFile(filename);
    const program = parser.produceAST(input);
    let result = evaluate(program, env);
}

function ql() {
    const parser = new Parser();
    const env = createGlobalENV();

    console.log("\nQuill REPL v0.0.1");
    console.log("Type 'exit' to exit the REPL\n");
    // Continue Repl Until User Stops Or Types `exit`
    while (true) {
        const input = prompt("$ ");
        // Check for no user or exit keyword
        if (!input || input.includes("exit")) {
            Deno.exit(1);
        }

        // Clear Screen on clear keyword
        if (input.includes("clear")) {
            console.clear();
            continue;
        }

        // Print the link to the repo if help keyword is used
        if (input.includes("help")) {
            console.log("Here is the link to our website!\nComing Soon!\n")
            continue;
        }

        // Produce AST From sourc-code
        const program = parser.produceAST(input);


        const result = evaluate(program, env);
        console.log(result);
    }
}
