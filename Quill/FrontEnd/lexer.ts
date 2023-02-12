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
  Var, // Variable
  Const, // Constant
  FUNC, // Function
  ASYNC, // Async Function
  ARRAY, // Array
  IF, // If
  ELSE, // Else
  ELIF, //Else if
  WHILE, // While
  FOR, // For
  CHAR, // Char
  PULL, // Pull

  // Operators
  ARROWUP, // ^
  DASH, // -

  GT, // >
  GTE, // >=
  EQUALTO, // ==
  LT, // <
  LTE, // <=
  NOT, // !
  AND, // &&
  OR, // ||
  NULL, // ?
  PLUSEQUAL, // +=
  MINUSEQUAL, // -=

  OpenParen, // (
  CloseParen, // )

  OPENBRACE, // [
  CLOSEBRACE, // ]

  OPENBRACKET, // {
  CLOSEBRACKET, // }

  HASH, // #

  // Grouping * Operators
  BinaryOperator, // + - * / %
  Equals, // =
  Semicolen, // ;
  COLON, // :
  COMMA, // ,
  DOT, // .
  UNDERSCORE, // _
  THEN, // Then
  RETURN, // return

  // Special
  EOF, // Signified the end of file
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
};
// Reoresents a single token from the source-code.
export interface Token {
  line: number; // Line number of the token;
  value: string; // contains the raw value as seen inside the source code.
  type: TokenType; // tagged structure.
}

// Returns a token of a given type and value
function token(value = "", type: TokenType, line: number): Token {
  return { value, type, line };
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
  let inString = false;
  let currentString = "";
  const tokens = new Array<Token>();
  const src = sourceCode.split("");
  while (src.length > 0) {
    // Check if the new line character is present
    if (src[0] == "\n") {
      Line++;
    }

    // Skip over any comments in the source code
    if (src[0] === "/" && src[1] === "*") {
      while (src.length > 0 && (src[0] !== "*" || src[1] !== "/")) {
        src.shift();
      }
      src.shift();
      src.shift();
      continue;
    } else if (src[0] === "#") {
      while (src.length > 0 && src[0] !== "\n") {
        src.shift();
      }
      continue;
    }

    if (src[0] === "\"") {
      if (inString) {
        inString = false;
        tokens.push(token(src.shift(), TokenType.String, Line));
        currentString = "";
      } else {
        inString = true;
        tokens.push(token(src.shift(), TokenType.String, Line));
      }
      src.shift();
      continue;
    } else if (inString) {
      currentString += src.shift();
      continue;
    }

    // BEGIN PARSING ONE CHARACTER TOKENS
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen, Line));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen, Line));
    } else if (src[0] == "[") {
      tokens.push(token(src.shift(), TokenType.OPENBRACE, Line));
    } else if (src[0] == "]") {
      tokens.push(token(src.shift(), TokenType.CLOSEBRACE, Line));
    } else if (src[0] == "{") {
      tokens.push(token(src.shift(), TokenType.OPENBRACKET, Line));
    } else if (src[0] == "}") {
      tokens.push(token(src.shift(), TokenType.CLOSEBRACKET, Line));
    } else if (src[0] == "_") {
      tokens.push(token(src.shift(), TokenType.UNDERSCORE, Line));
    } else if (src[0] == ".") {
      tokens.push(token(src.shift(), TokenType.DOT, Line));
    } else if (src[0] == "?") {
      tokens.push(token(src.shift(), TokenType.NULL, Line));
    } 
     // HANDLE MULTICHARACTER KEYWORDS, TOKENS, IDENTIFIERS ETC...
    else if (src[0] == ";") {
      tokens.push(token(src.shift(), TokenType.Semicolen, Line));
    } else if (src[0] == ":") {
      if (tokens[tokens.length - 1].type === TokenType.Identifier) {
        tokens.push(token(src.shift(), TokenType.COLON, Line));
      }
    } else if (src[0] == "<") {
      if (src[1] == "=") {
        tokens.push(token(src.shift(), TokenType.LTE, Line));
        src.shift();
      } else {
        tokens.push(token(src.shift(), TokenType.LT, Line));
      }
    } else if (src[0] == ">") {
      if (src[1] == "=") {
        tokens.push(token(src.shift(), TokenType.GTE, Line));
        src.shift();
      } else {
        tokens.push(token(src.shift(), TokenType.GT, Line));
      }
    } else if (src[0] == "=") {
      if (src[1] == "=") {
        tokens.push(token(src.shift(), TokenType.EQUALTO, Line));
        src.shift();
      } else {
        tokens.push(token(src.shift(), TokenType.Equals, Line));
      }
    } 
    
    else if (src[0] == ",") {
      tokens.push(token(src.shift(), TokenType.COMMA, Line));
    } else if (src[0] == "!" && src[1] == "=") {
      tokens.push(token(src.shift(), TokenType.NOT, Line));
      src.shift();
    } else if (src[0] == "&" && src[1] == "&") {
      tokens.push(token(src.shift(), TokenType.AND, Line));
      src.shift();
    } else if (src[0] == "|" && src[1] == "|") {
      tokens.push(token(src.shift(), TokenType.OR, Line));
      src.shift();
    } else if (src[0] == "+" && src[1] == "=") {
      tokens.push(token(src.shift(), TokenType.PLUSEQUAL, Line));
      src.shift();
    } else if (src[0] == "-" && src[1] == "=") {
      tokens.push(token(src.shift(), TokenType.MINUSEQUAL, Line));
      src.shift();
    }
    
    // HANDLE WHITESPACE
    else if (isskippable(src[0])) {
      src.shift();
    }
    // HANDLE BINARY OPERATORS
    else if (
      src[0] == "+" ||
      src[0] == "-" ||
      src[0] == "*" ||
      src[0] == "/" ||
      src[0] == "%"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator, Line));
    } // Handle Conditional & Assignment Tokens

    // TODO:: HANDLE CHAR LITERALS
    else {
      // Handle numeric literals -> Integers
      if (isint(src[0])) {
        let num = "";
        while (src.length > 0 && isint(src[0])) {
          num += src.shift();
        }

        // append new numeric token.
        tokens.push(token(num, TokenType.Number, Line));
      } 

      // TODO:: HANDLE STRING LITERALS
      else if (src[0] == '"') {
        let str = "";
        while (src.length > 0 && src[0] != '"') {
          str += src.shift();
        }
        src.shift();
        src.shift();
        tokens.push(token(str, TokenType.String, Line));
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
          tokens.push(token(ident, reserved, Line));
        } else {
          // Unreconized name must mean user defined symbol.
          tokens.push(token(ident, TokenType.Identifier, Line));
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

  tokens.push({ type: TokenType.EOF, value: "EndOfFile", line: Line });
  return tokens;
}
