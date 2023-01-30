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
    | "ReturnStmt"
    | "IfStmt"
    | "ElifStmt"
    | "NullExpr"
    | "ArrayLiteral"

    // Comaparison
    | "GreaterThanExpr"
    | "LessThanExpr"
    | "EqualsExpr"
    | "NotEqualsExpr"
    | "AndExpr"
    | "OrExpr"

    // Literals
    | "Property"
    | "ObjectLiteral"
    | "NumericLiteral"
    | "Identifier" 
    | "BinaryExpr"
    | "GreaterThanExpr"
    | "LessThanExpr"

export interface Stmt {
    kind: NodeType;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
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
    body: Stmt[] | null;
    async: boolean;
}

export interface ArrayLiteral extends Stmt {
    kind: "ArrayLiteral";
    elements: Stmt[] | undefined;
}

export interface IfStmt extends Stmt {
    kind: "IfStmt";
    condition: Expr;
    thenBranch: Stmt[];
    elifBranch: ElifStmt[] | undefined;
    elseBranch: Stmt[] | never;
}

export interface ElifStmt extends Stmt {
    kind: "ElifStmt";
    condition: Expr;
    body: Stmt[];
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

export interface NullExpr extends Expr {
    kind: "NullExpr";
}

export interface GreaterThanExpr extends Expr {
    kind: "GreaterThanExpr";
    left: Expr;
    right: Expr;
    operator: ">";
}
export interface LessThanExpr extends Expr {
    kind: "LessThanExpr";
    left: Expr;
    right:Expr;
    operator: "<";
}

export interface EqualsExpr extends Expr {
    kind: "EqualsExpr";
    left: Expr;
    right: Expr;
    operator: "=";
}

export interface NotEqualsExpr extends Expr {
    kind: "NotEqualsExpr";
    left: Expr;
    right: Expr;
    operator: "!=";
}

export interface AndExpr extends Expr {
    kind: "AndExpr";
    left: Expr;
    right: Expr;
    operator: "&&";
}

export interface OrExpr extends Expr {
    kind: "OrExpr";
    left: Expr;
    right: Expr;
    operator: "||";
}

export interface CallExpr extends Expr {
    kind: "CallExpr";
    args: Expr[];
    caller: Expr;
}

export interface MemberExpr extends Expr {
    kind: "MemberExpr";
    left: Expr;
    right: Expr;
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

export interface ReturnStmt extends Expr {
    kind: "ReturnStmt";
    value: Expr;
}