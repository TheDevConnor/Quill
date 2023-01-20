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
<<<<<<< HEAD
  Return,
IfStatement,
=======
>>>>>>> parent of 4d4bf41 (added a return type!)
} from "./ast.ts";

import { Token, tokenize, TokenType } from "./lexer.ts";

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
  private expect(type: TokenType, err: any) {
    const prev = this.tokens.shift() as Token;
    if (!prev || prev.type != type) {
      console.error("Parser Error:\n", err, prev, " - Expecting: ", type);
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
<<<<<<< HEAD
    private parse_stmt(): Stmt {
      switch (this.at().type) {
          case TokenType.Var:
          case TokenType.Const:
              return this.parse_var_decl();
          case TokenType.Identifier:
              if (this.at().value === "return") {
                  this.eat();
                  return {
                      kind: "Return",
                      value: this.parse_expr()
                  }
              } else if (this.at().value === "if") {
                  return this.parse_if_stmt();
              } else {
              return this.parse_expr();
              }
          case TokenType.FUNC:
              return this.parse_function_decl();
          case TokenType.IF:
              return this.parse_if_stmt();
          default: {
              return this.parse_expr();
          }
=======
  private parse_stmt(): Stmt {
    switch (this.at().type) {
      case TokenType.Var:
      case TokenType.Const:
        return this.parse_var_decl();
      case TokenType.Identifier:
        return this.parse_expr();
      case TokenType.FUNC:
        return this.parse_function_decl();
      default: {
        return this.parse_expr();
>>>>>>> parent of 4d4bf41 (added a return type!)
      }
  }

  // Handles Function Declarations
  parse_function_decl(): Stmt {
    this.eat(); // Eat the 'func' keyword
    const name = this.expect(TokenType.Identifier, "Expected function name").value;
    const args = this.parse_args();
    const params: string[] = [];
    for (const arg of args) {
        if (arg.kind !== "Identifier"){
            throw new Error("Expected Identifier inside function parameters");
        }
        params.push((arg as Identifier).symbol);
    }

    this.expect(TokenType.OPENBRACKET, "Expected '{' after function parameters");
    const body: Stmt[] = [];
    while (this.at().type !== TokenType.EOF && this.at().type !== TokenType.CLOSEBRACKET) {
        body.push(this.parse_stmt());
    }

    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after function body");
    const func = {
        body,
        name,
        parameters: params,
        kind: "FunctionDeclaration",
    } as unknown as FunctionDeclaration;

    return func;
  }

  private parse_if_stmt(): IfStatement {
    this.eat(); // Eat the 'if' keyword
    const test = this.parse_expr();
    this.expect(TokenType.OpenParen, "Expected '(' after if condition");
    this.expect(TokenType.CloseParen, "Expected ')' after if condition");
    const consequent = this.parse_stmt();
    let alternate: Stmt | undefined = undefined;
    if (this.at().value === "else") {
      this.eat();
      alternate = this.parse_stmt();
    }
    return { kind: "IfStatement", test, consequent, alternate };
  }

private parse_block(): Stmt[] {
    const stmts: Stmt[] = [];
    while (this.at().type !== TokenType.EOF && this.at().type !== TokenType.CLOSEBRACKET) {
        stmts.push(this.parse_stmt());
    }
    this.expect(TokenType.CLOSEBRACKET, "Expected '}' after block");
    return stmts;
}


  // Handle variable declarations
  // ( var | const ) IDENTIFIER ( = EXPR )? ( ; | \n
  parse_var_decl(): Stmt {
    const isConstant = this.eat().type == TokenType.Const;
    const identifier = this.expect(TokenType.Identifier, 
      "Expected Identifier name following 'have' or 'const' keywords, or an underscore (_)").value;

    if (this.at().type == TokenType.Semicolen || this.next().type == TokenType.COLON) {
      this.eat();
      if (isConstant) {
        console.error(
          "Cannot declare a constant without a value being assigned" + this.at().value);
      }

      return {
        kind: "VarDeclaration",
        identifier,
        const: false,
      } as unknown as VarDeclaration;
    }

    //Checks to see if the assignment operator is present and is :=
    if (this.at().type === TokenType.COLON && this.next().type === TokenType.Equals) {
      this.eat();
      this.eat();
    } else if (this.at().type === TokenType.Equals) {
      this.eat();
    } else {
      console.error("Expected ':=' after ':'.");
    }

    const declaration = { 
      identifier,
      kind: "VarDeclaration",
      value: this.parse_expr(),
      const: isConstant,
    } as unknown as VarDeclaration;

    this.expect(TokenType.Semicolen, "Expected ';' after variable declaration.");

    return declaration;
  }

  // Handle expressions
  private parse_expr(): Expr {
    return this.parse_assignment_expr();
  }

  private parse_assignment_expr(): Expr {
      const left = this.parse_object_expr();

      if(this.at().type == TokenType.COLON) {
        this.eat();
        if (this.at().type == TokenType.Equals) {
          this.eat(); // advance to the next token
          const value = this.parse_assignment_expr();
          return {
            kind: "AssignmentExpr",
            assingee: left,
            value,
          }as unknown as BinaryExpr;
        } else {
          console.error("Expected ':=' after ':'.");
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
        const key = this.expect(TokenType.Identifier, "Expected identifier as key.").value;

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
      this.at().value == "/" || this.at().value == "*" || this.at().value == "%"
    ) {
      const operator = this.eat().value;
      const right = this.parse_call_member_expr();
      left = {
        kind: "BinaryExpr",
        left,
        right,
        operator,
      }as unknown as BinaryExpr;
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
        console.error("Unexpected token found during parsing!", this.at());
        Deno.exit(1);
    }
  }
}
