// deno-lint-ignore-file no-explicit-any
import {
  BinaryExpr,
  CallExpr,
  Expr,
  Identifier,
  MemberExpr,
  NumericLiteral,
  ObjectLiteral,
  Program,
  Property,
  Stmt,
  VarDeclaration,
  FunctionDeclaration,
  ReturnStmt,
  IfStmt,
  GreaterThanExpr,
  LessThanExpr,
  EqualsExpr,
  NotEqualsExpr,
  AndExpr,
  OrExpr,
  NullExpr,
  ElifStmt,
  ArrayLiteral,
  WhileStmt,
  PlusEqualsExpr,
  MinusEqualsExpr,
  GreaterThanOrEqualsExpr,
  LessThanOrEqualsExpr,
  ForStmt,
} from "./ast.ts";

import { Token, tokenize, TokenType } from "./lexer.ts";
import { error, trace, info } from "./tracing.ts";

/**
 * Frontend for producing a valid AST from sourcode
 */
export default class Parser {
  private tokens: Token[] = [];

  /*
   * Determines if the parsing is complete and the END OF FILE Is reached.
   */
  private not_eof(): boolean {
    return this.tokens[0].type != TokenType.EOF;
  }

  /**
   * Returns the currently available token
   */
  private at() {
    return this.tokens[0] as Token;
  }

  private next() {
    return this.tokens[1] as Token;
  }

  /**
   * Returns the previous token and then advances the tokens array to the next value.
   */
  private eat() {
    const prev = this.tokens.shift() as Token;
    return prev;
  }

  /**
   * Returns the previous token and then advances the tokens array to the next value.
   *  Also checks the type of expected token and throws if the values dnot match.
   */
  private expect(type: TokenType, _err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      error(
        "[Parser] Error: \n" +
          _err +
          " line: " +
          `\x1b[31m${this.at().line}\x1b[0m` +
          " - Expecting: " +
          `\x1b[31m${this.at().value}\x1b`
      );
      Deno.exit(1);
    }

    return prev;
  }

  public produceAST(sourceCode: string): Program {
    this.tokens = tokenize(sourceCode);
    const program: Program = {
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
  private parse_stmt(): Stmt {
    // console.log(`Current token: ${this.at().value}, Token type: ${this.at().type}`);
    switch (this.at().type) {
      case TokenType.Var:
      case TokenType.Const:
        return this.parse_var_decl();
      case TokenType.IF:
        return this.parse_if_stmt();
      case TokenType.Identifier:
        if (this.at().value === "return") {
          return this.parse_return_stmt();
        }
        return this.parse_expr();
      case TokenType.FUNC:
        return this.parse_function_decl();
      case TokenType.ARRAY:
        return this.parse_array_literal();
      case TokenType.RETURN:
        return this.parse_return_stmt();
      case TokenType.WHILE:
        return this.parse_while_stmt();
      case TokenType.FOR:
        return this.parse_for_stmt();
      default:
        return this.parse_expr();
    }
  }

  private parse_while_stmt(): WhileStmt {
    this.eat(); // Eat the 'while' keyword

    const condition = this.parse_expr();

    this.expect(TokenType.OPENBRACKET, "Expected '{' after while condition");
    const body: Stmt[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACKET
    ) {
      body.push(this.parse_stmt());
    }

    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after while body");

    return {
      kind: "WhileStmt",
      condition,
      body,
    } as unknown as WhileStmt;
  }

  private parse_for_stmt(): ForStmt {
    this.eat(); // Eat the 'for' keyword
  
    let init: Expr | VarDeclaration;
    if (this.at().type === TokenType.Var) {
      init = this.parse_var_decl();
    } else {
      init = this.parse_expr();
    }
    this.expect(TokenType.Semicolen, "Expected ';' after for init");
  
    const condition = this.parse_expr();
    this.expect(TokenType.Semicolen, "Expected ';' after for condition");
  
    this.expect(TokenType.OPENBRACKET, "Expected '{' after for increment");
  
    const body: Stmt[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACKET
    ) {
      body.push(this.parse_stmt());
    }
  
    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after for body");
  
    return {
      kind: "ForStmt",
      init,
      condition,
      body,
    } as unknown as ForStmt;
  }

  private parse_array_literal(): ArrayLiteral {
    this.eat(); // Eat the 'array' keyword

    const name = this.expect(TokenType.Identifier, "Expected array name").value;
    this.expect(TokenType.OPENBRACE, "Expected '[' after array name");

    const elements: Expr[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACE
    ) {
      elements.push(this.parse_expr());

      if (this.at().type === TokenType.COMMA) {
        this.eat();
      }
    }

    this.expect(TokenType.CLOSEBRACE, "Expected ']' after array elements");

    return {
      name,
      elements,
      kind: "ArrayLiteral",
    } as ArrayLiteral;
  }

  // Handles Function Declarations
  parse_function_decl(): Stmt {
    this.eat(); // Eat the 'func' keyword

    let isAsync = false;
    if (this.at().type == TokenType.ASYNC) {
      isAsync = true;
      this.eat(); // Eat the 'async' keyword
    }

    const name = this.expect(
      TokenType.Identifier,
      "Expected function name"
    ).value;
    const args = this.parse_args();
    const params: string[] = [];
    for (const arg of args) {
      if (arg.kind !== "Identifier") {
        throw new Error("Expected Identifier inside function parameters");
      }
      params.push((arg as Identifier).symbol);
    }
    this.expect(
      TokenType.OPENBRACKET,
      "Expected '{' after function parameters"
    );
    const body: Stmt[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACKET
    ) {
      body.push(this.parse_stmt());
    }

    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after function body");

    console.log("Function body: ", body);
    console.log("Function name: ", name);

    const func = {
      body,
      name,
      parameters: params,
      async: isAsync,
      kind: "FunctionDeclaration",
    } as unknown as FunctionDeclaration;

    return func;
  }

  // Handles Return Statements
  // return EXPR ;
  parse_return_stmt(): Stmt {
    this.eat(); // Eat the 'return' keyword
    const expr = this.parse_expr();
    return {
      kind: "ReturnStmt",
      value: expr,
    } as ReturnStmt;
  }

  // Handle variable declarations
  // ( var | const ) IDENTIFIER ( = EXPR )? ( ; | \n
  parse_var_decl(): Stmt {
    const isConstant = this.eat().type == TokenType.Const;
    const identifier = this.expect(
      TokenType.Identifier,
      "Expected Identifier name following 'have' or 'const' keywords, or an underscore (_)"
    ).value;

    if (
      this.at().type == TokenType.Semicolen ||
      this.next().type == TokenType.COLON
    ) {
      this.eat();
      if (isConstant) {
        error(
          "Cannot declare a constant without a value being assigned" +
            this.at().value
        );
      }

      return {
        kind: "VarDeclaration",
        identifier,
        const: false,
      } as unknown as VarDeclaration;
    }

    //Checks to see if the assignment operator is present and is :=
    if (
      this.at().type === TokenType.COLON &&
      this.next().type === TokenType.Equals
    ) {
      this.eat();
      this.eat();
    } else if (this.at().type === TokenType.Equals) {
      this.eat();
    } else {
      error("Expected ':=' after ':'.");
    }

    const declaration = {
      identifier,
      kind: "VarDeclaration",
      value: this.parse_expr(),
      const: isConstant,
    } as unknown as VarDeclaration;

    return declaration;
  }

  // Handle expressions
  private parse_expr(): Expr {
    // Initialize a variable to store the parsed expression
    let expr = this.parse_assignment_expr();

    // Check if the current token is of type NULL
    // If it is, eat the token and assign a NullExpr to the expr variable
    while (this.at().type == TokenType.NULL) {
      this.eat();
      expr = {
        kind: "NullExpr",
      } as unknown as NullExpr;
    }

    // Check if the current token is either of type GT or LT
    // If it is, eat the token, parse the next assignment expression, and update the expr variable with a GreaterThanExpr or LessThanExpr object
    while (this.at().type == TokenType.GT || this.at().type == TokenType.LT) {
      const opertation = this.eat();
      const right = this.parse_assignment_expr();
      expr = {
        kind:
          opertation.type === TokenType.GT ? "GreaterThanExpr" : "LessThanExpr",
        left: expr,
        right,
        operation: opertation.value,
      } as unknown as GreaterThanExpr | LessThanExpr;
    }

    // Check if the current token is either of type GTE or LTE
    // If it is, eat the token, parse the next assignment expression, and update the expr variable with a GreaterThanOrEqualsExpr or LessThanOrEqualsExpr object
    while (this.at().type == TokenType.GTE || this.at().type == TokenType.LTE) {
      const opertation = this.eat();
      const right = this.parse_assignment_expr();
      expr = {
        kind:
          opertation.type === TokenType.GTE
            ? "GreaterThanOrEqualsExpr"
            : "LessThanOrEqualsExpr",
        left: expr,
        right,
        operation: opertation.value,
      } as unknown as GreaterThanOrEqualsExpr | LessThanOrEqualsExpr;
    }

    // Check if the current token is either of type Equals or NOT
    // If it is, eat the token, parse the next expression, and update the expr variable with an EqualsExpr or NotEqualsExpr object
    while (
      this.at().type == TokenType.Equals ||
      this.at().type == TokenType.NOT
    ) {
      const opertation = this.eat(); // Eat the operator
      const right = this.parse_expr();
      expr = {
        kind:
          opertation.type === TokenType.Equals ? "EqualsExpr" : "NotEqualsExpr",
        left: expr,
        right,
        operation: opertation.value,
      } as unknown as EqualsExpr | NotEqualsExpr;
    }

    // Check if the current token is either of type AND or OR
    // If it is, eat the token, parse the next assignment expression, and update the expr variable with an AndExpr or OrExpr object
    while (this.at().type == TokenType.AND || this.at().type == TokenType.OR) {
      const opertation = this.eat(); // Eat the operator
      const right = this.parse_assignment_expr();
      expr = {
        kind: opertation.type === TokenType.AND ? "AndExpr" : "OrExpr",
        left: expr,
        right,
        operation: opertation.value,
      } as unknown as AndExpr | OrExpr;
    }

    // Check if the current token is either of type PLUSEQUAL or MINUSEQUAL
    // If it is, eat the token, parse the next assignment expression, and update the expr variable with a PlusEqualsExpr or MinusEqualsExpr object
    while (
      this.at().type == TokenType.PLUSEQUAL ||
      this.at().type == TokenType.MINUSEQUAL
    ) {
      const operation = this.eat(); // Eat the operator
      const right = this.parse_assignment_expr();
      expr = {
        kind:
          operation.type === TokenType.PLUSEQUAL
            ? "PlusEqualsExpr"
            : "MinusEqualsExpr",
        left: expr,
        right,
        operation: operation.value,
      } as unknown as PlusEqualsExpr | MinusEqualsExpr;
    }
    return expr;
  }
    
  private parse_identifier() {
    const token = this.eat();
    return {
      type: "Identifier",
      value: token.value
    };
  }
  

  private parse_if_stmt(): Stmt {
    this.eat(); // Eat the 'if' keyword
    const condition = this.parse_expr(); // Parse the condition
    this.expect(TokenType.OPENBRACKET, "Expected '{' after if condition");
    const thenBranch: Stmt[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACKET
    ) {
      thenBranch.push(this.parse_stmt());
    }
    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after if condition");

    let elseBranch: Stmt[] | undefined; // undefined means no else branch
    let elifBranch: ElifStmt[] | undefined;

    while (
      this.at().type === TokenType.ELSE ||
      this.at().type === TokenType.ELIF
    ) {
      if (this.at().type === TokenType.ELSE) {
        this.eat(); // Eat the 'else' keyword
        this.expect(TokenType.OPENBRACKET, "Expected '{' after 'else' keyword");
        elseBranch = [];
        while (
          this.at().type !== TokenType.EOF &&
          this.at().type !== TokenType.CLOSEBRACKET
        ) {
          elseBranch.push(this.parse_stmt());
        }
        this.expect(
          TokenType.CLOSEBRACKET,
          "Expected '}' after 'else' keyword"
        );
      } else if (this.at().type === TokenType.ELIF) {
        this.eat(); // Eat the 'elif' keyword
        const elifCondition = this.parse_expr();
        this.expect(TokenType.OPENBRACKET, "Expected '{' after 'elif' keyword");
        const elifBody: Stmt[] = [];
        while (
          this.at().type !== TokenType.EOF &&
          this.at().type !== TokenType.CLOSEBRACKET
        ) {
          elifBody.push(this.parse_stmt());
        }
        this.expect(
          TokenType.CLOSEBRACKET,
          "Expected '}' after 'elif' keyword"
        );
        elifBranch = [
          {
            kind: "ElifStmt",
            condition: elifCondition,
            body: elifBody,
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
    } as unknown as IfStmt;
  }

  private parse_assignment_expr(): Expr {
    const left = this.parse_object_expr();

    if (this.at().type == TokenType.COLON) {
      this.eat();
      if (this.at().type == TokenType.Equals) {
        this.eat(); // advance to the next token
        const value = this.parse_assignment_expr();
        return {
          kind: "AssignmentExpr",
          assingee: left,
          value,
        } as unknown as BinaryExpr;
      } else {
        error("Expected ':=' after ':'.");
      }
    }
    return left;
  }

  private parse_object_expr(): Expr {
    // { Prop[] }
    if (this.at().type !== TokenType.OPENBRACKET) {
      return this.parse_additive_expr();
    }

    this.eat(); // advance to the next token

    const properties = new Array<Property>();

    while (this.not_eof() && this.at().type !== TokenType.CLOSEBRACKET) {
      const key = this.expect(
        TokenType.Identifier,
        "Expected identifier as key."
      ).value;

      // This is a shorthand property key: pair -> { key, }
      if (this.at().type == TokenType.COMMA) {
        this.eat(); // advance to the next token
        properties.push({
          kind: "Property",
          key,
        } as Property);
        continue;
      }
      // This is a shorthand property key: pair -> { key }
      else if (this.at().type == TokenType.CLOSEBRACKET) {
        properties.push({
          kind: "Property",
          key,
        });
        continue;
      }

      // { key: value }
      this.expect(TokenType.COLON, "Expected ':' after key.");
      const value = this.parse_expr();

      properties.push({
        kind: "Property",
        value: value,
        key,
      } as Property);

      if (this.at().type != TokenType.CLOSEBRACKET) {
        this.expect(TokenType.COMMA, "Expected ',' or '}' after property.");
      }
    }

    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after object literal.");
    return { kind: "ObjectLiteral", properties } as ObjectLiteral;
  }

  // Handle Addition & Subtraction Operations
  private parse_additive_expr(): Expr {
    let left = this.parse_multiplicitave_expr();

    while (this.at().value == "+" || this.at().value == "-") {
      const operator = this.eat().value;
      const right = this.parse_multiplicitave_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as BinaryExpr;
    }

    return left;
  }

  // Handle Multiplication, Division & Modulo Operations
  private parse_multiplicitave_expr(): Expr {
    let left = this.parse_call_member_expr();

    while (
      this.at().value == "/" ||
      this.at().value == "*" ||
      this.at().value == "%"
    ) {
      const operator = this.eat().value;
      const right = this.parse_call_member_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      } as unknown as BinaryExpr;
    }

    return left;
  }

  // foo.x()()
  private parse_call_member_expr(): Expr {
    const member = this.parse_member_expr();

    if (this.at().type == TokenType.OpenParen) {
      return this.parse_call_expr(member);
    }

    return member;
  }

  private parse_call_expr(caller: Expr): Expr {
    let call_expr: Expr = {
      kind: "CallExpr",
      caller,
      args: this.parse_args(),
    } as CallExpr;

    if (this.at().type == TokenType.OpenParen) {
      call_expr = this.parse_call_expr(call_expr);
    }

    return call_expr;
  }

  private parse_args(): Expr[] {
    this.expect(TokenType.OpenParen, "Expected open parenthesis");
    const args =
      this.at().type == TokenType.CloseParen ? [] : this.parse_arguments_list();

    this.expect(
      TokenType.CloseParen,
      "Missing closing parenthesis inside arguments list"
    );
    return args;
  }

  private parse_arguments_list(): Expr[] {
    const args = [this.parse_assignment_expr()];

    while (this.at().type == TokenType.COMMA && this.eat()) {
      args.push(this.parse_assignment_expr());
    }

    return args;
  }

  private parse_member_expr(): Expr {
    let object = this.parse_primary_expr();

    while (
      this.at().type == TokenType.DOT ||
      this.at().type == TokenType.OPENBRACE
    ) {
      const operator = this.eat();
      let property: Expr;
      let computed: boolean;

      // non-computed values aka obj.expr
      if (operator.type == TokenType.DOT) {
        computed = false;
        // get identifier
        property = this.parse_primary_expr();
        if (property.kind != "Identifier") {
          throw `Cannonot use dot operator without right hand side being a identifier`;
        }
      } else {
        // this allows obj[computedValue]
        computed = true;
        property = this.parse_expr();
        this.expect(
          TokenType.CLOSEBRACE,
          "Missing closing bracket in computed value."
        );
      }

      object = {
        kind: "MemberExpr",
        object,
        property,
        computed,
      } as MemberExpr;
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
  private parse_primary_expr(): Expr {
    const tk = this.at().type;

    // Determine which token we are currently at and return literal value
    switch (tk) {
      // User defined values.
      case TokenType.Identifier:
        return { kind: "Identifier", symbol: this.eat().value } as Identifier;

      // Constants and Numeric Constants
      case TokenType.Number:
        return {
          kind: "NumericLiteral",
          value: parseFloat(this.eat().value),
        } as NumericLiteral;

      // Grouping Expressions
      case TokenType.OpenParen: {
        this.eat(); // eat the opening paren
        const value = this.parse_expr();
        this.expect(
          TokenType.CloseParen,
          "Unexpected token found inside parenthesised expression. Expected closing parenthesis."
        ); // closing paren
        return value;
      }

      // Unidentified Tokens and Invalid Code Reached
      default:
        error(
          `\x1b[31m[Parser Error]\x1b[0m Unexpected token found during parsing! On line: '` +
            `\x1b[31m${this.at().line}\x1b[0m` +
            "' Of type: '" +
            `\x1b[31m${this.at().value}\x1b[0m` +
            "'"
        );
        Deno.exit(1);
    }
  }
}
