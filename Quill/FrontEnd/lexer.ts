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
  IF, // If
  ELSE, // Else
  ELIF, //Else if

  // Operators
  ARROWUP, // ^
  DASH, // -

  GT, // >
  LT, // <
  NOT, // !
  AND, // &&
  OR, // ||
  NULL, // ?

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
  RETURN,// return

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
};
// Reoresents a single token from the source-code.
export interface Token {
  value: string; // contains the raw value as seen inside the source code.
  type: TokenType; // tagged structure.
}

// Returns a token of a given type and value
function token(value = "", type: TokenType): Token {
  return { value, type };
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
  const tokens = new Array<Token>();
  const src = sourceCode.split("");
  while (src.length > 0) {

    // Skip over any comments in the source code
    if (src[0] === "/" && src[1] === "*") {
      while (src.length > 0 && (src[0] !== "*" || src[1] !== "/")) {
        src.shift();
      }
      src.shift();
      src.shift();
      continue;
    }

    // BEGIN PARSING ONE CHARACTER TOKENS
    if (src[0] == "(") {
      tokens.push(token(src.shift(), TokenType.OpenParen));
    } else if (src[0] == ")") {
      tokens.push(token(src.shift(), TokenType.CloseParen));
    } else if (src[0] == "[") {
      tokens.push(token(src.shift(), TokenType.OPENBRACE));
    } else if (src[0] == "]") {
      tokens.push(token(src.shift(), TokenType.CLOSEBRACE));
    } else if (src[0] == "{") {
      tokens.push(token(src.shift(), TokenType.OPENBRACKET));
    } else if (src[0] == "}") {
      tokens.push(token(src.shift(), TokenType.CLOSEBRACKET));
    } else if (src[0] == "-") {
      tokens.push(token(src.shift(), TokenType.DASH));
    } else if (src[0] == "_") {
      tokens.push(token(src.shift(), TokenType.UNDERSCORE));
    } else if (src[0] == ".") {
      tokens.push(token(src.shift(), TokenType.DOT));
    } else if (src[0] == "?") {
      tokens.push(token(src.shift(), TokenType.NULL));
    }
    // HANDLE WHITESPACE
    else if (isskippable(src[0])) {
      src.shift();
    }
    // HANDLE BINARY OPERATORS
    else if (
      src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/" ||
      src[0] == "%"
    ) {
      tokens.push(token(src.shift(), TokenType.BinaryOperator));
    } // Handle Conditional & Assignment Tokens
    else if (src[0] == "=") {
      tokens.push(token(src.shift(), TokenType.Equals));
    } // HANDLE MULTICHARACTER KEYWORDS, TOKENS, IDENTIFIERS ETC...
    else if (src[0] == ";") {
      tokens.push(token(src.shift(), TokenType.Semicolen));
    }
    else if (src[0] == ":") {
      if (tokens[tokens.length - 1].type === TokenType.Identifier) {
        tokens.push(token(src.shift(), TokenType.COLON));
      }
    }
    else if (src[0] == "<") {
      tokens.push(token(src.shift(), TokenType.LT));
    }
    else if (src[0] == ">") {
      tokens.push(token(src.shift(), TokenType.GT));
    }
    else if (src[0] == ",") {
      tokens.push(token(src.shift(), TokenType.COMMA));
    }
    else if (src[0] == "!" && src[1] == "=") {
      tokens.push(token(src.shift(), TokenType.NOT));
      src.shift();
    }
    else if (src[0] == "&" && src[1] == "&") {
      tokens.push(token(src.shift(), TokenType.AND));
      src.shift();
    }
    else if (src[0] == "|" && src[1] == "|") {
      tokens.push(token(src.shift(), TokenType.OR));
      src.shift();
    }
    else if (src[0] == "^") {
      tokens.push(token(src.shift(), TokenType.ARROWUP));
    }
    // TODO:: HANDLE STRING LITERALS

    // TODO:: HANDLE CHAR LITERALS

    else {
      // Handle numeric literals -> Integers
      if (isint(src[0])) {
        let num = "";
        while (src.length > 0 && isint(src[0])) {
          num += src.shift();
        }

        // append new numeric token.
        tokens.push(token(num, TokenType.Number));
      } // Handle Identifier & Keyword Tokens.
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
          tokens.push(token(ident, reserved));
        } else {
          // Unreconized name must mean user defined symbol.
          tokens.push(token(ident, TokenType.Identifier));
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
          src[0],
        );
        Deno.exit(1);
      }
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EndOfFile" });
  return tokens;
}