//------------------------------------------------------------
//-------------------       Lexer          -------------------
//---   Responsible for producing tokens from the source   ---
//------------------------------------------------------------

export enum TokenType {
	// Literal Types
	Number,
	Identifier,
	String,

	// Keywords
	Import,
	FROM,

	Var,
	Const,
	FUNC,
	ASYNC,
	ARRAY,
	IF,
	ELSE,
	ELIF,
	TERNARY,
	WHILE,
	FOR,
	CHAR,
	PULL,


	// Operators
	ARROWUP,
	DASH,

	GT,
	GTE,
	EQUALTO,
	LT,
	LTE,
	NOT,
	AND,
	OR,
	NULL,
	PLUSEQUAL,
	MINUSEQUAL,
	WalarsOperation,

	OpenParen,
	CloseParen,

	OPENBRACE,
	CLOSEBRACE,

	OPENBRACKET,
	CLOSEBRACKET,

	HASH,


	// Grouping * Operators
	BinaryOperator,
	Equals,
	Semicolen,
	COLON,
	QuestionMark,
	TernaryColon,
	COMMA,
	DOT,
	UNDERSCORE,
	THEN,
	RETURN,
	Generic,

	// Special
	EOF,
	Private,
	Public,
}

/**
 * Constant lookup for keywords and known identifiers + symbols.
 */
const KEYWORDS: Record<string, TokenType> = {
	have: TokenType.Var,
	const: TokenType.Const,
	func: TokenType.FUNC,
	async: TokenType.ASYNC,
	if: TokenType.IF,
	else: TokenType.ELSE,
	elif: TokenType.ELIF,
	then: TokenType.THEN,
	return: TokenType.RETURN,
	array: TokenType.ARRAY,
	while: TokenType.WHILE,
	for: TokenType.FOR,
	tern: TokenType.TERNARY,
	public: TokenType.Public,
	private: TokenType.Private,

	import: TokenType.Import,
	from: TokenType.FROM,
};
// Reoresents a single token from the source-code.
export interface Token {
	line: number; // Line number of the token;
	position: number; // Position of the token in the line.
	value: string; // contains the raw value as seen inside the source code.
	type: TokenType; // tagged structure.
}

// Returns a token of a given type and value
function token(value = " ", type: TokenType, line: number, position: number): Token {
	return { value, type, line, position };
}

/**
 * Returns whether the character passed in alphabetic -> [a-zA-Z]
 */
function isalpha(src: string) {
	return src.toUpperCase() != src.toLowerCase();
}

/**
 * Returns true if the character is whitespace like -> [\s, \t, \n]
 */
function isskippable(str: string) {
	return str == " " || str == "\n" || str == "\t" || str == "\r";
}

/**
 Return whether the character is a valid integer -> [0-9]
 */
function isint(str: string) {
	const c = str.charCodeAt(0);
	const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
	return c >= bounds[0] && c <= bounds[1];
}

/**
 * Given a string representing source code: Produce tokens and handles
 * possible unidentified characters.
 *
 * - Returns a array of tokens.
 * - Does not modify the incoming string.
 */ 

export function tokenize(sourceCode: string): Token[] {
	let Line = 1;
	let Position = 0;
	const tokens = new Array<Token>();
	const src = sourceCode.split("");

	while (src.length > 0) {
		// Check if the new line character is present
		if (src[0] == "\n") {
			Line++;
			Position = 0
		}

		// Skip over any comments in the source code
		else if (src[0] === "#") {
			while (src.length > 0) {
				src.shift();
			}
			continue;
		} else if (src[0] === "/" && src[1] === "/") {
			while (src.length > 0) {
				src.shift();
			}
			continue;
		}

		// BEGIN PARSING ONE CHARACTER TOKENS
		if (src[0] == "(") {
			createToken(TokenType.OpenParen, src.shift())
			// tokens.push(token(src.shift(), TokenType.OpenParen, Line, Position));
		} else if (src[0] == ")") {
			createToken(TokenType.CloseParen, src.shift())
			// tokens.push(token(src.shift(), TokenType.CloseParen, Line, Position));
		} else if (src[0] == "[") {
			createToken(TokenType.OPENBRACE, src.shift())
			// tokens.push(token(src.shift(), TokenType.OPENBRACE, Line, Position));
		} else if (src[0] == "]") {
			createToken(TokenType.CLOSEBRACE, src.shift())
			// tokens.push(token(src.shift(), TokenType.CLOSEBRACE, Line, Position));
		} else if (src[0] == "{") {
			createToken(TokenType.OPENBRACKET, src.shift())
			// tokens.push(token(src.shift(), TokenType.OPENBRACKET, Line, Position));
		} else if (src[0] == "}") {
			createToken(TokenType.CLOSEBRACKET, src.shift())
			// tokens.push(token(src.shift(), TokenType.CLOSEBRACKET, Line, Position));
		} else if (src[0] == "_") {
			createToken(TokenType.UNDERSCORE, src.shift())
			// tokens.push(token(src.shift(), TokenType.UNDERSCORE, Line, Position));
		} else if (src[0] == ".") {
			createToken(TokenType.DOT, src.shift())
			// tokens.push(token(src.shift(), TokenType.DOT, Line, Position));
		}
		// Handle ternary operator
		else if (src[0] == "?") {
			createToken(TokenType.QuestionMark, src.shift())
			// tokens.push(token(src.shift(), TokenType.QuestionMark, Line, Position));
		}
		// HANDLE MULTICHARACTER KEYWORDS, TOKENS, IDENTIFIERS ETC...
		else if (src[0] == ";") {
			createToken(TokenType.Semicolen, src.shift())
			// tokens.push(token(src.shift(), TokenType.Semicolen, Line, Position));
		} else if (src[0] == ":") {
			if (src[1] == "=") {
				createToken(TokenType.WalarsOperation, src.shift())
				// tokens.push(token(src.shift(), TokenType.WalarsOperation, Line, Position));
				tokens[tokens.length - 1].value += src.shift();
			} else {
				createToken(TokenType.COLON, src.shift())
			}
		} else if (src[0] == "<") {
			if (src[1] == "=") {
				createToken(TokenType.LTE, src.shift())
				// tokens.push(token(src.shift(), TokenType.LTE, Line, Position));
				tokens[tokens.length - 1].value += src.shift();
			} else {
				createToken(TokenType.LT, src.shift())
				// tokens.push(token(src.shift(), TokenType.LT, Line, Position));
			}
		} else if (src[0] == ">") {
			if (src[1] == "=") {
				createToken(TokenType.GTE, src.shift())
				// tokens.push(token(src.shift(), TokenType.GTE, Line, Position));
				tokens[tokens.length - 1].value += src.shift();
			} else {
				createToken(TokenType.GT, src.shift())
				// tokens.push(token(src.shift(), TokenType.GT, Line, Position));
			}
		} else if (src[0] == "=") {
			if (src[1] == "=") {
				createToken(TokenType.EQUALTO, src.shift())
				// tokens.push(token(src.shift(), TokenType.EQUALTO, Line, Position));
				tokens[tokens.length - 1].value += src.shift();
			} else if (src[1] == ">") {
				createToken(TokenType.Generic, src.shift())
				// tokens.push(token(src.shift(), TokenType.Generic, Line, Position));
				tokens[tokens.length - 1].value += src.shift();
			} else {
				createToken(TokenType.Equals, src.shift())
				// tokens.push(token(src.shift(), TokenType.Equals, Line, Position));
			}
		}

		else if (src[0] == ",") {
			createToken(TokenType.COMMA, src.shift())
			// tokens.push(token(src.shift(), TokenType.COMMA, Line, Position));
		} else if (src[0] == "!" && src[1] == "=") {
			createToken(TokenType.NOT, src.shift())
			// tokens.push(token(src.shift(), TokenType.NOT, Line, Position));
			src.shift();
		} else if (src[0] == "&" && src[1] == "&") {
			createToken(TokenType.AND, src.shift())
			// tokens.push(token(src.shift(), TokenType.AND, Line, Position));
			src.shift();
		} else if (src[0] == "|") {
			if (src[1] == "|") {
				createToken(TokenType.OR, src.shift())
				// tokens.push(token(src.shift(), TokenType.OR, Line, Position));
				src.shift();
			}
		} else if (src[0] == "+" && src[1] == "=") {
			createToken(TokenType.PLUSEQUAL, src.shift())
			// tokens.push(token(src.shift(), TokenType.PLUSEQUAL, Line, Position));
			src.shift();
		} else if (src[0] == "-" && src[1] == "=") {
			// tokens.push(token(src.shift(), TokenType.MINUSEQUAL, Line, Position));
			createToken(TokenType.MINUSEQUAL, src.shift())
			src.shift();
		}

		// HANDLE WHITESPACE
		else if (isskippable(src[0])) {
			src.shift();
			Position++
		}
		// HANDLE BINARY OPERATORS
		else if (
			src[0] == "+" ||
			src[0] == "-" ||
			src[0] == "*" ||
			src[0] == "/" ||
			src[0] == "%"
		) {
			// tokens.push(token(src.shift(), TokenType.BinaryOperator, Line, Position));
			createToken(TokenType.BinaryOperator, src.shift())
		} // Handle Conditional & Assignment Tokens

		// TODO:: HANDLE CHAR LITERALS
		else {
			//Handle numeric literals -> Integers
			if (isint(src[0])) {
				let num = "";
				while (src.length > 0 && isint(src[0])) {
					num += src.shift();
				}

				// append new numeric token.
				// tokens.push(token(num, TokenType.Number, Line, Position));
				createToken(TokenType.Number, num)
			}

			// TODO:: HANDLE FLOAT LITERALS
			else if (src[0] == ".") {
				let num = "";
				while (src.length > 0 && isint(src[0])) {
					console.log(src[0]);
					num += src.shift();
				}

				console.log(num);
				// append new numeric token.
				// tokens.push(token(num, TokenType.Number, Line, Position));
				createToken(TokenType.Number, num)
			}

			// TODO:: HANDLE STRING LITERALS
			else if (src[0] == '"') {
				let str = "";
				src.shift();

				for (let i = 0; i <= src.length; i++) {
					if (src[i] == '"') {
						str = src.splice(0, i + 1).join("");
						if (str.length > 1) {
							str = str.substring(0, str.length - 1);
							break; // This fucker took me 2 hours to find.
						}
					}
				}

				// tokens.push(token(str, TokenType.String, Line, Position));
				createToken(TokenType.String, str)
			}

			// Handle Identifier & Keyword Tokens.
			else if (isalpha(src[0]) || src[0] == "_") {
				let ident = "";
				while (src.length > 0) {
					if (isalpha(src[0]) || isint(src[0]) || src[0] == "_") {
						ident += src.shift();
					} else {
						break;
					}
				}
				// CHECK FOR RESERVED KEYWORDS
				const reserved = KEYWORDS[ident];
				// If value is not undefined then the identifier is
				// reconized keyword
				if (typeof reserved == "number") {
					// tokens.push(token(ident, reserved, Line, Position));
					createToken(reserved, ident)
				} else {
					// Unreconized name must mean user defined symbol.
					// tokens.push(token(ident, TokenType.Identifier, Line, Position));
					createToken(TokenType.Identifier, ident)
				}
			} else if (isskippable(src[0])) {
				// Skip uneeded chars.
				src.shift();
			} // Handle unreconized characters.
			// TODO: Impliment better errors and error recovery.
			else {
				console.error(
					"Unreconized character found in source: ",
					src[0].charCodeAt(0),
					src[0]
				);
				Deno.exit(1);
			}
		}
	}

	function createToken(type: TokenType, value = "") {
		const tk = token(value, type, Line, Position);
		// console.log(tk, Line, Position)
		const tkLength = value.length

		Position += tkLength
		tokens.push(tk)
	}

	tokens.push({ type: TokenType.EOF, value: "EndOfFile", line: Line, position: Position });
	return tokens;
}