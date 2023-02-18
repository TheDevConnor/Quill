"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_ts_1 = require("./lexer.ts");
// deno-lint-ignore no-unused-vars
const tracing_ts_1 = require("./tracing.ts");
/**
 * Frontend for producing a valid AST from sourcode
 */
class Parser {
    constructor() {
        this.tokens = [];
    }
    /*
     * Determines if the parsing is complete and the END OF FILE Is reached.
     */
    not_eof() {
        return this.tokens[0].type != lexer_ts_1.TokenType.EOF;
    }
    /**
     * Returns the currently available token
     */
    at() {
        return this.tokens[0];
    }
    next() {
        return this.tokens[1];
    }
    /**
     * Returns the previous token and then advances the tokens array to the next value.
     */
    eat() {
        const prev = this.tokens.shift();
        return prev;
    }
    /**
     * Returns the previous token and then advances the tokens array to the next value.
     *  Also checks the type of expected token and throws if the values dnot match.
     */
    expect(type, errMessage) {
        const prev = this.tokens.shift();
        if (!prev || prev.type != type) {
            throw new Error(`[Parser] Error: ${errMessage} line: ${this.at().line} - Expecting: ${this.at().value}`);
        }
        return prev;
    }
    produceAST(sourceCode) {
        this.tokens = (0, lexer_ts_1.tokenize)(sourceCode);
        const program = {
            kind: "Program",
            body: [],
        };
        // Parse until end of file
        while (this.not_eof()) {
            program.body.push(this.parse_stmt());
        }
        return program;
    }
    // Handle complex statement types
    parse_stmt() {
        const currentToken = this.at();
        const currentTokenValue = currentToken.value;
        const currentTokenType = currentToken.type;
        switch (currentTokenType) {
            case lexer_ts_1.TokenType.Var:
            case lexer_ts_1.TokenType.Const:
                return this.parse_var_decl();
            case lexer_ts_1.TokenType.IF:
                return this.parse_if_stmt();
            case lexer_ts_1.TokenType.Identifier:
                if (currentTokenValue === "return") {
                    return this.parse_return_stmt();
                }
                return this.parse_expr();
            case lexer_ts_1.TokenType.FUNC:
                return this.parse_function_decl();
            case lexer_ts_1.TokenType.ARRAY:
                return this.parse_array_literal();
            case lexer_ts_1.TokenType.RETURN:
                return this.parse_return_stmt();
            case lexer_ts_1.TokenType.WHILE:
                return this.parse_while_stmt();
            case lexer_ts_1.TokenType.FOR:
                return this.parse_for_stmt();
            default:
                return this.parse_expr();
        }
    }
    parse_while_stmt() {
        this.eat(); // Eat the 'while' keyword
        const condition = this.parse_expr();
        this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after while condition");
        const body = [];
        while (this.at().type !== lexer_ts_1.TokenType.EOF &&
            this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
            body.push(this.parse_stmt());
        }
        this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after while body");
        return {
            kind: "WhileStmt",
            condition,
            body,
        };
    }
    parse_for_stmt() {
        this.eat(); // Eat the 'for' keyword
        let init;
        if (this.at().type === lexer_ts_1.TokenType.Var) {
            init = this.parse_var_decl();
        }
        else {
            init = this.parse_expr();
        }
        this.expect(lexer_ts_1.TokenType.Semicolen, "Expected ';' after for init");
        const condition = this.parse_expr();
        this.expect(lexer_ts_1.TokenType.Semicolen, "Expected ';' after for condition");
        this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after for increment");
        const body = [];
        while (this.at().type !== lexer_ts_1.TokenType.EOF &&
            this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
            body.push(this.parse_stmt());
        }
        this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after for body");
        return {
            kind: "ForStmt",
            init,
            condition,
            body,
        };
    }
    parse_array_literal() {
        this.eat(); // Eat the 'array' keyword
        const name = this.expect(lexer_ts_1.TokenType.Identifier, "Expected array name").value;
        this.expect(lexer_ts_1.TokenType.OPENBRACE, "Expected '[' after array name");
        const elements = [];
        while (this.at().type !== lexer_ts_1.TokenType.EOF &&
            this.at().type !== lexer_ts_1.TokenType.CLOSEBRACE) {
            elements.push(this.parse_expr());
            // elements.push(this.parse_stmt());
            if (this.at().type === lexer_ts_1.TokenType.COMMA) {
                this.eat();
            }
        }
        this.expect(lexer_ts_1.TokenType.CLOSEBRACE, "Expected ']' after array elements");
        const array = {
            name: name,
            elements: elements,
            kind: "ArrayLiteral",
        };
        return array;
    }
    // Handles Function Declarations
    parse_function_decl() {
        this.eat(); // Eat the 'func' keyword
        let isAsync = false;
        if (this.at().type == lexer_ts_1.TokenType.ASYNC) {
            isAsync = true;
            this.eat(); // Eat the 'async' keyword
        }
        const name = this.expect(lexer_ts_1.TokenType.Identifier, "Expected function name").value;
        const args = this.parse_args();
        const params = [];
        for (const arg of args) {
            if (arg.kind !== "Identifier") {
                throw new Error("Expected Identifier inside function parameters");
            }
            params.push(arg.symbol);
        }
        this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after function parameters");
        const body = [];
        while (this.at().type !== lexer_ts_1.TokenType.EOF &&
            this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
            body.push(this.parse_stmt());
        }
        this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after function body");
        const func = {
            body,
            name,
            parameters: params,
            async: isAsync,
            kind: "FunctionDeclaration",
        };
        return func;
    }
    // Handles Return Statements
    // return EXPR ;
    parse_return_stmt() {
        this.eat(); // Eat the 'return' keyword
        const expr = this.parse_expr();
        return {
            kind: "ReturnStmt",
            value: expr,
        };
    }
    // Handle variable declarations
    // ( var | const ) IDENTIFIER ( = EXPR )? ( ; | \n
    parse_var_decl() {
        const isConstant = this.eat().type == lexer_ts_1.TokenType.Const;
        const identifier = this.expect(lexer_ts_1.TokenType.Identifier, "Expected Identifier name following 'have' or 'const' keywords, or an underscore (_)").value;
        if (this.at().type == lexer_ts_1.TokenType.Semicolen ||
            this.next().type == lexer_ts_1.TokenType.COLON) {
            this.eat();
            if (isConstant) {
                (0, tracing_ts_1.error)("Cannot declare a constant without a value being assigned" +
                    this.at().value);
            }
            return {
                kind: "VarDeclaration",
                identifier,
                const: false,
            };
        }
        //Checks to see if the assignment operator is present and is :=
        if (this.at().type === lexer_ts_1.TokenType.COLON &&
            this.next().type === lexer_ts_1.TokenType.Equals) {
            this.eat();
            this.eat();
        }
        else if (this.at().type === lexer_ts_1.TokenType.Equals) {
            this.eat();
        }
        else {
            (0, tracing_ts_1.error)("Expected ':=' after ':'.");
        }
        const declaration = {
            identifier,
            kind: "VarDeclaration",
            value: this.parse_expr(),
            const: isConstant,
        };
        return declaration;
    }
    // Handle expressions
    parse_expr() {
        // Initialize a variable to store the parsed expression
        let expr = this.parse_assignment_expr();
        // Check if the current token is of type NULL
        // If it is, eat the token and assign a NullExpr to the expr variable
        while (this.at().type == lexer_ts_1.TokenType.NULL) {
            this.eat();
            expr = {
                kind: "NullExpr",
            };
        }
        // Check if the current token is either of type GT or LT
        // If it is, eat the token, parse the next assignment expression, and update the expr variable with a GreaterThanExpr or LessThanExpr object
        while (this.at().type == lexer_ts_1.TokenType.GT || this.at().type == lexer_ts_1.TokenType.LT) {
            const opertation = this.eat();
            const right = this.parse_assignment_expr();
            expr = {
                kind: opertation.type === lexer_ts_1.TokenType.GT ? "GreaterThanExpr" : "LessThanExpr",
                left: expr,
                right,
                operation: opertation.value,
            };
        }
        // Check if the current token is either of type GTE or LTE
        // If it is, eat the token, parse the next assignment expression, and update the expr variable with a GreaterThanOrEqualsExpr or LessThanOrEqualsExpr object
        while (this.at().type == lexer_ts_1.TokenType.GTE || this.at().type == lexer_ts_1.TokenType.LTE) {
            const opertation = this.eat();
            const right = this.parse_assignment_expr();
            expr = {
                kind: opertation.type === lexer_ts_1.TokenType.GTE
                    ? "GreaterThanOrEqualsExpr"
                    : "LessThanOrEqualsExpr",
                left: expr,
                right,
                operation: opertation.value,
            };
        }
        // Check if the current token is either of type Equals or NOT
        // If it is, eat the token, parse the next expression, and update the expr variable with an EqualsExpr or NotEqualsExpr object
        while (this.at().type == lexer_ts_1.TokenType.EQUALTO ||
            this.at().type == lexer_ts_1.TokenType.Equals ||
            this.at().type == lexer_ts_1.TokenType.NOT) {
            const opertation = this.eat(); // Eat the operator
            const right = this.parse_expr();
            expr = {
                kind: opertation.type === lexer_ts_1.TokenType.Equals ? "EqualsExpr" : "NotEqualsExpr",
                left: expr,
                right,
                operation: opertation.value,
            };
        }
        // Check if the current token is either of type AND or OR
        // If it is, eat the token, parse the next assignment expression, and update the expr variable with an AndExpr or OrExpr object
        while (this.at().type == lexer_ts_1.TokenType.AND || this.at().type == lexer_ts_1.TokenType.OR) {
            const opertation = this.eat(); // Eat the operator
            const right = this.parse_assignment_expr();
            expr = {
                kind: opertation.type === lexer_ts_1.TokenType.AND ? "AndExpr" : "OrExpr",
                left: expr,
                right,
                operation: opertation.value,
            };
        }
        // Check if the current token is either of type PLUSEQUAL or MINUSEQUAL
        // If it is, eat the token, parse the next assignment expression, and update the expr variable with a PlusEqualsExpr or MinusEqualsExpr object
        while (this.at().type == lexer_ts_1.TokenType.PLUSEQUAL ||
            this.at().type == lexer_ts_1.TokenType.MINUSEQUAL) {
            const operation = this.eat(); // Eat the operator
            const right = this.parse_assignment_expr();
            expr = {
                kind: operation.type === lexer_ts_1.TokenType.PLUSEQUAL
                    ? "PlusEqualsExpr"
                    : "MinusEqualsExpr",
                left: expr,
                right,
                operation: operation.value,
            };
        }
        return expr;
    }
    parse_if_stmt() {
        this.eat(); // Eat the 'if' keyword
        const condition = this.parse_expr(); // Parse the condition
        this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after if condition");
        const thenBranch = [];
        while (this.at().type !== lexer_ts_1.TokenType.EOF &&
            this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
            thenBranch.push(this.parse_stmt());
        }
        this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after if condition");
        let elifBranch; // undefined means no else branch
        let elseBranch; // undefined means no else branch
        while (this.at().type === lexer_ts_1.TokenType.ELSE ||
            this.at().type === lexer_ts_1.TokenType.ELIF) {
            if (this.at().type === lexer_ts_1.TokenType.ELSE) {
                this.eat(); // Eat the 'else' keyword
                this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after 'else' keyword");
                const elseBody = [];
                while (this.at().type !== lexer_ts_1.TokenType.EOF &&
                    this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
                    elseBody.push(this.parse_stmt());
                }
                this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after 'else' keyword");
                elseBranch = [
                    {
                        kind: "ElseStmt",
                        body: elseBody,
                    },
                ];
            }
            else if (this.at().type === lexer_ts_1.TokenType.ELIF) {
                this.eat(); // Eat the 'elif' keyword
                const elifCondition = this.parse_expr();
                this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after 'elif' keyword");
                const elifBody = [];
                while (this.at().type !== lexer_ts_1.TokenType.EOF &&
                    this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
                    elifBody.push(this.parse_stmt());
                }
                this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after 'elif' keyword");
                // Check if there is an else branch after the elif branch
                if (this.at().type === lexer_ts_1.TokenType.ELSE) {
                    this.eat(); // Eat the 'else' keyword
                    this.expect(lexer_ts_1.TokenType.OPENBRACKET, "Expected '{' after 'else' keyword");
                    const elseBody = [];
                    while (this.at().type !== lexer_ts_1.TokenType.EOF &&
                        this.at().type !== lexer_ts_1.TokenType.CLOSEBRACKET) {
                        elseBody.push(this.parse_stmt());
                    }
                    this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Expected '}' after 'else' keyword");
                    elseBranch = [
                        {
                            kind: "ElseStmt",
                            body: elseBody,
                        },
                    ];
                }
                elifBranch = [
                    {
                        kind: "ElifStmt",
                        condition: elifCondition,
                        body: elifBody,
                        elseBranch,
                    },
                ];
            }
        }
        return {
            kind: "IfStmt",
            condition,
            thenBranch,
            elifBranch,
            elseBranch,
        };
    }
    parse_assignment_expr() {
        const left = this.parse_object_expr();
        if (this.at().type == lexer_ts_1.TokenType.COLON) {
            this.eat();
            if (this.at().type == lexer_ts_1.TokenType.Equals) {
                this.eat(); // advance to the next token
                const value = this.parse_assignment_expr();
                return {
                    kind: "AssignmentExpr",
                    assingee: left,
                    value,
                };
            }
            else {
                (0, tracing_ts_1.error)("Expected ':=' after ':'.");
            }
        }
        return left;
    }
    parse_object_expr() {
        // { Prop[] }
        if (this.at().type !== lexer_ts_1.TokenType.OPENBRACKET) {
            return this.parse_additive_expr();
        }
        this.eat(); // advance past open brace.
        const properties = new Array();
        while (this.not_eof() && this.at().type != lexer_ts_1.TokenType.CLOSEBRACKET) {
            const key = this.expect(lexer_ts_1.TokenType.Identifier, "Object literal key exprected").value;
            // Allows shorthand key: pair -> { key, }
            if (this.at().type == lexer_ts_1.TokenType.COMMA) {
                this.eat(); // advance past comma
                properties.push({ key, kind: "Property" });
                continue;
            } // Allows shorthand key: pair -> { key }
            else if (this.at().type == lexer_ts_1.TokenType.CLOSEBRACKET) {
                properties.push({ key, kind: "Property" });
                continue;
            }
            // { key: val }
            this.expect(lexer_ts_1.TokenType.COLON, "Missing colon following identifier in ObjectExpr");
            const value = this.parse_expr();
            properties.push({ kind: "Property", value, key });
            if (this.at().type != lexer_ts_1.TokenType.CLOSEBRACKET) {
                this.expect(lexer_ts_1.TokenType.COMMA, "Expected comma or closing bracket following property");
            }
        }
        this.expect(lexer_ts_1.TokenType.CLOSEBRACKET, "Object literal missing closing brace.");
        return {
            kind: "ObjectLiteral",
            properties
        };
    }
    // Handle Addition & Subtraction Operations
    parse_additive_expr() {
        let left = this.parse_multiplicitave_expr();
        while (this.at().value == "+" || this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parse_multiplicitave_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            };
        }
        return left;
    }
    // Handle Multiplication, Division & Modulo Operations
    parse_multiplicitave_expr() {
        let left = this.parse_call_member_expr();
        while (this.at().value == "/" ||
            this.at().value == "*" ||
            this.at().value == "%") {
            const operator = this.eat().value;
            const right = this.parse_call_member_expr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            };
        }
        return left;
    }
    // foo.x()
    parse_call_member_expr() {
        const member = this.parse_member_expr();
        if (this.at().type == lexer_ts_1.TokenType.OpenParen) {
            return this.parse_call_expr(member);
        }
        return member;
    }
    parse_call_expr(caller) {
        let call_expr = {
            kind: "CallExpr",
            caller,
            args: this.parse_args(),
        };
        if (this.at().type == lexer_ts_1.TokenType.OpenParen) {
            call_expr = this.parse_call_expr(call_expr);
        }
        return call_expr;
    }
    parse_args() {
        this.expect(lexer_ts_1.TokenType.OpenParen, "Expected open parenthesis");
        const args = this.at().type == lexer_ts_1.TokenType.CloseParen ? [] : this.parse_arguments_list();
        this.expect(lexer_ts_1.TokenType.CloseParen, "Missing closing parenthesis inside arguments list");
        return args;
    }
    parse_arguments_list() {
        const args = [this.parse_assignment_expr()];
        while (this.at().type == lexer_ts_1.TokenType.COMMA && this.eat()) {
            args.push(this.parse_assignment_expr());
        }
        return args;
    }
    // allows for obj.prop and obj[computedValue]
    parse_member_expr() {
        let object = this.parse_primary_expr();
        while (this.at().type == lexer_ts_1.TokenType.DOT ||
            this.at().type == lexer_ts_1.TokenType.OPENBRACE) {
            const operator = this.eat();
            let property;
            let computed;
            // non-computed values aka obj.expr
            if (operator.type == lexer_ts_1.TokenType.DOT) {
                computed = false;
                // get identifier
                property = this.parse_primary_expr();
                if (property.kind != "Identifier") {
                    throw `Cannonot use dot operator without right hand side being a identifier`;
                }
            }
            else {
                // this allows obj[computedValue]
                computed = true;
                property = this.parse_expr();
                this.expect(lexer_ts_1.TokenType.CLOSEBRACE, "Missing closing bracket in computed value.");
            }
            object = {
                kind: "MemberExpr",
                object,
                property,
                computed
            };
        }
        return object;
    }
    // Orders Of Prescidence
    // Assignment
    // Object
    // AdditiveExpr
    // MultiplicitaveExpr
    // Call
    // Member
    // PrimaryExpr
    // Parse Literal Values & Grouping Expressions
    parse_primary_expr() {
        const tk = this.at().type;
        // Determine which token we are currently at and return literal value
        switch (tk) {
            // User defined values.
            case lexer_ts_1.TokenType.Identifier:
                return { kind: "Identifier", symbol: this.eat().value };
            // Constants and Numeric Constants
            case lexer_ts_1.TokenType.Number:
                return {
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                };
            // String Literals
            case lexer_ts_1.TokenType.String:
                return {
                    kind: "StringLiteral",
                    value: this.eat().value,
                };
            // Grouping Expressions
            case lexer_ts_1.TokenType.OpenParen: {
                this.eat(); // eat the opening paren
                const value = this.parse_expr();
                this.expect(lexer_ts_1.TokenType.CloseParen, "Unexpected token found inside parenthesised expression. Expected closing parenthesis."); // closing paren
                return value;
            }
            // Unidentified Tokens and Invalid Code Reached
            default:
                (0, tracing_ts_1.error)(`\x1b[31m[Parser Error]\x1b[0m Unexpected token found during parsing! On line: '` +
                    `\x1b[31m${this.at().line}\x1b[0m` +
                    "' Of type: '" +
                    `\x1b[31m${this.at().value}\x1b[0m` +
                    "'");
                Deno.exit(1);
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map