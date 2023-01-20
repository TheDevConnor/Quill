// deno-lint-ignore-file no-empty-interface
//------------------------------------------------------------
//-----------------       AST TYPES          -----------------
//--- Define the types of the AST nodes and the AST itself ---
//------------------------------------------------------------

export type NodeType = 
    // Statements
    | "Program"
    | "VarDeclaration"
    | "FunctionDeclaration"

    // Expressions
    | "AssignmentExpr"
    | "MemberExpr"
    | "CallExpr"
<<<<<<< HEAD
    | "Return"
    | "IfStatement"
    | "Block"
=======
>>>>>>> parent of 4d4bf41 (added a return type!)

    // Literals
    | "Property"
    | "ObjectLiteral"
    | "NumericLiteral"
    | "Identifier" 
    | "BinaryExpr"

export interface Stmt {
    kind: NodeType;
}

interface Block extends Stmt {
    kind: "Block";
    body: Stmt[];
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

export interface IfStatement extends Stmt {
    kind: "IfStatement";
    test: Expr;
    consequent: Stmt;
    alternate?: Stmt;
}

export interface VarDeclaration extends Stmt {
    kind: "VarDeclaration";
    constant: boolean,
    identifier: string,
    value?: Expr,
}

export interface FunctionDeclaration extends Stmt {
    kind: "FunctionDeclaration";
    parameters: string[];
    name: string;
    body: Stmt[];
    async: boolean;
}

export interface Expr extends Stmt {}

export interface AssignmentExpr extends Expr {
    kind: "AssignmentExpr";
    assingee: Expr;
    value: Expr;
}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}

export interface CallExpr extends Expr {
    kind: "CallExpr";
    args: Expr[];
    caller: Expr;
}

export interface MemberExpr extends Expr {
    kind: "MemberExpr";
    object: Expr;
    property: Expr;
    computed: boolean;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string;
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number; 
}

export interface Property extends Expr {
    kind: "Property";
    key: string;
    value?: Expr;
}

export interface ObjectLiteral extends Expr {
    kind: "ObjectLiteral";
    properties: Property[];
}