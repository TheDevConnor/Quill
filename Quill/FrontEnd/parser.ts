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
  ElseStmt,
  StringLiteral,
} from "./ast.ts";

import { Token, tokenize, TokenType } from "./lexer.ts";
// deno-lint-ignore no-unused-vars
import { error, trace, info, debug } from "./tracing.ts";

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
  private expect(type: TokenType, errMessage: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      throw new Error(
        `[Parser] Error: ${errMessage} line: ${this.at().line} - Expecting: ${
          this.at().value
        }`
      );
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
    const currentToken = this.at();
    const currentTokenValue = currentToken.value;
    const currentTokenType = currentToken.type;

    switch (currentTokenType) {
      case TokenType.Var:
      case TokenType.Const:
        return this.parse_var_decl();
      case TokenType.IF:
        return this.parse_if_stmt();
      case TokenType.Identifier:
        if (currentTokenValue === "return") {
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
    } as WhileStmt;
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
    } as ForStmt;
  }

  private parse_array_literal(): ArrayLiteral {
    this.eat(); // Eat the 'array' keyword

    const name = this.expect(TokenType.Identifier, "Expected array name").value;
    this.expect(TokenType.OPENBRACE, "Expected '[' after array name");

    const elements: Expr[] | Stmt[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACE
    ) {
      elements.push(this.parse_expr());
      // elements.push(this.parse_stmt());

      if (this.at().type === TokenType.COMMA) {
        this.eat();
      }
    }

    this.expect(TokenType.CLOSEBRACE, "Expected ']' after array elements");

    const array: ArrayLiteral = {
      name: name,
      elements: elements,
      kind: "ArrayLiteral",
    };

    return array;
  }

  // Handles Function Declarations
 private parse_function_decl(): Stmt {
   this.eat(); // Eat the 'func' keyword
 
   let isAsync = false;
   if (this.at().type == TokenType.ASYNC) {
     isAsync = true;
     this.eat(); // Eat the 'async' keyword
   }
 
   const name = this.expect(TokenType.Identifier, "Expected function name").value;
   const args = this.parse_args();
   const params = args.filter(arg => arg.kind === "Identifier").map(arg => arg.symbol);
   
   this.expect(TokenType.OPENBRACKET, "Expected '{' after function parameters");
   const body = [];
   while (this.at().type !== TokenType.EOF && this.at().type !== TokenType.CLOSEBRACKET) {
     body.push(this.parse_stmt());
   }
   
   this.expect(TokenType.CLOSEBRACKET, "Expected '}' after function body");
   
   return {
     body,
     name,
     parameters: params,
     async: isAsync,
     kind: "FunctionDeclaration",
   } as FunctionDeclaration;
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
      let isConstant = false;
      let identifier = "";
      let value = undefined;
  
      if (this.eat().type == TokenType.Const) {
        isConstant = true;
      }
      identifier = this.expect(
        TokenType.Identifier,
        "Expected Identifier name following 'have' or 'const' keywords, or an underscore (_)"
      ).value;
  
      if (this.at().type == TokenType.COLON) {
        this.eat();
        if (this.at().type === TokenType.Equals) {
          this.eat();
          value = this.parse_expr();
        } else {
          error("Expected ':=' after ':'.");
        }
      } else if (this.at().type === TokenType.Semicolen) {
        if (isConstant) {
          error(
            "Cannot declare a constant without a value being assigned" +
              this.at().value
          );
        }
        this.eat();
      }
  
      return {
        kind: "VarDeclaration",
        identifier,
        const: isConstant,
        value,
      } as unknown as VarDeclaration;
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
      this.at().type == TokenType.EQUALTO ||
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

  private parse_branch_body(): Stmt[] {
    this.expect(TokenType.OPENBRACKET, "Expected '{' after branch keyword");
    const body: Stmt[] = [];
    while (
      this.at().type !== TokenType.EOF &&
      this.at().type !== TokenType.CLOSEBRACKET
    ) {
      body.push(this.parse_stmt());
    }
    this.expect(
      TokenType.CLOSEBRACKET,
      "Expected '}' after branch keyword"
    );
    return body;
  }
  
  private parse_if_stmt(): Stmt {
    this.eat(); // Eat the 'if' keyword
    const condition = this.parse_expr(); // Parse the condition
    const thenBranch = this.parse_branch_body();
  
    let elifBranch: ElifStmt[] | undefined; // undefined means no else branch
    let elseBranch: ElseStmt[] | undefined; // undefined means no else branch
  
    while (
      this.at().type === TokenType.ELSE ||
      this.at().type === TokenType.ELIF
    ) {
      if (this.at().type === TokenType.ELSE) {
        this.eat(); // Eat the 'else' keyword
        elseBranch = [
          {
            kind: "ElseStmt",
            body: this.parse_branch_body(),
          },
        ];
      } else if (this.at().type === TokenType.ELIF) {
        this.eat(); // Eat the 'elif' keyword
        const elifCondition = this.parse_expr();
        const elifBody = this.parse_branch_body();
  
        // Check if there is an else branch after the elif branch
        if (this.at().type === TokenType.ELSE) {
          this.eat(); // Eat the 'else' keyword
          elseBranch = [
            {
              kind: "ElseStmt",
              body: this.parse_branch_body(),
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
    } as unknown as IfStmt;
  }

private parse_assignment_expr(): Expr {
  const left = this.parse_object_expr();

  if (this.at().type !== TokenType.COLON) {
    return left;
  }

  this.eat();
  if (this.at().type !== TokenType.Equals) {
    error("Expected ':=' after ':'.");
  }

  this.eat(); // advance to the next token
  const value = this.parse_assignment_expr();
  return {
    kind: "AssignmentExpr",
    assingee: left,
    value,
  } as unknown as BinaryExpr;
}

  private parse_object_expr(): Expr {
    // { Prop[] }
    if (this.at().type !== TokenType.OPENBRACKET) {
      return this.parse_additive_expr();
    }
  
    this.eat(); // advance past open brace.
    const properties: Property[] = [];
  
    while (this.not_eof() && this.at().type !== TokenType.CLOSEBRACKET) {
      const key = this.expect(TokenType.Identifier, "Object literal key expected").value;
  
      // Handle shorthand key: pair -> { key, } or { key }
      if (this.at().type === TokenType.COMMA || this.at().type === TokenType.CLOSEBRACKET) {
        properties.push({ key, kind: "Property" });
        if (this.at().type === TokenType.COMMA) {
          this.eat(); // advance past comma
        }
        continue;
      }
  
      // { key: val }
      this.expect(TokenType.COLON, "Missing colon following identifier in ObjectExpr");
      const value = this.parse_expr();
      properties.push({ kind: "Property", value, key });
  
      // Expect comma or closing bracket following property
      if (this.at().type !== TokenType.CLOSEBRACKET) {
        this.expect(TokenType.COMMA, "Expected comma or closing bracket following property");
      }
    }
  
    this.expect(TokenType.CLOSEBRACKET, "Object literal missing closing brace.");
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

  // foo.x()
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

  // allows for obj.prop and obj[computedValue]
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
        computed
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
