// deno-lint-ignore-file no-empty-interface
//------------------------------------------------------------
//-----------------       AST TYPES          -----------------
//--- Define the types of the AST nodes and the AST itself ---
//------------------------------------------------------------

export type NodeType =
	// Statements
	| "Program"
	| "Module"
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
	| "WhileStmt"
	| "ForStmt"
	| "ElseStmt"
	| "ImportStmt"

	// Comaparison
	| "GreaterThanExpr"
	| "GreaterThanOrEqualsExpr"
	| "LessThanExpr"
	| "LessThanOrEqualsExpr"
	| "EqualsExpr"
	| "NotEqualsExpr"
	| "AndExpr"
	| "OrExpr"
	| "IncrementExpr"
	| "DecrementExpr"

	// Literals
	| "Property"
	| "ObjectLiteral"
	| "NumericLiteral"
	| "Identifier"
	| "BinaryExpr"
	| "GreaterThanExpr"
	| "LessThanExpr"
	| "PlusEqualsExpr"
	| "MinusEqualsExpr"
	| "StringLiteral"
	| "CharLiteral"
	| "TernaryExpr"

	| "GenericFunctionDeclaration";

export interface Stmt {
	kind: NodeType;
}

export interface Program extends Stmt {
	kind: "Program";
	body: Stmt[];
}

export interface Module extends Stmt {
	kind: "Module";
	body: Stmt[];
	map: Map<string, Stmt>;
}

export interface VarDeclaration extends Stmt {
	kind: "VarDeclaration";
	constant: boolean;
	identifier: string;
	value?: Expr;
}

export interface ImportStmt extends Stmt {
	kind: "ImportStmt";
	name: string;
	fileName: string;
}

export interface FunctionDeclaration extends Stmt {
	kind: "FunctionDeclaration";
	access: string;
	name: string;
	parameters: string[];
	body: Stmt[] | null;
	async: boolean;
	generic: boolean;
}

export interface ArrayLiteral extends Stmt {
	kind: "ArrayLiteral";
	name: string;
	elements: Stmt[] | Expr[];
}

export interface WhileStmt extends Stmt {
	kind: "WhileStmt";
	condition: Expr;
	body: Stmt[];
}

export interface ForStmt extends Stmt {
	kind: "ForStmt";
	init: Expr;
	condition: Expr;
	increment: Expr;
	body: Stmt[];
}

export interface IfStmt extends Stmt {
	kind: "IfStmt";
	condition: Expr;
	thenBranch: Stmt[];
	elifBranch: ElifStmt[] | undefined;
	elseBranch: ElseStmt[] | undefined;
}

export interface ElifStmt extends Stmt {
	kind: "ElifStmt";
	condition: Expr;
	body: Stmt[];
	elseBranch: ElseStmt[] | undefined;
}

export interface ElseStmt extends Stmt {
	kind: "ElseStmt";
	body: Stmt[];
}

export interface TernaryExpr {
	kind: "TernaryExpr";
	condition: Expr;
	thenExpr: Expr;
	elseExpr: Expr;
}

export interface Expr extends Stmt { }

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
	right: Expr;
	operator: "<";
}

export interface GreaterThanOrEqualsExpr extends Expr {
	kind: "GreaterThanOrEqualsExpr";
	left: Expr;
	right: Expr;
	operator: ">=";
}

export interface LessThanOrEqualsExpr extends Expr {
	kind: "LessThanOrEqualsExpr";
	left: Expr;
	right: Expr;
	operation: "<=";
}

export interface EqualsExpr extends Expr {
	kind: "EqualsExpr";
	left: Expr;
	right: Expr;
	operator: "==";
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

export interface PlusEqualsExpr extends Expr {
	kind: "PlusEqualsExpr";
	left: Expr;
	right: Expr;
	operator: "+=";
}

export interface MinusEqualsExpr extends Expr {
	kind: "MinusEqualsExpr";
	left: Expr;
	right: Expr;
	operator: "-=";
}

// foo.bar()
export interface CallExpr extends Expr {
	kind: "CallExpr";
	args: Expr[];
	caller: Expr;
}

//foo["bar"]()
export interface MemberExpr extends Expr {
	// deno-lint-ignore no-explicit-any
	loc: any;
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

export interface StringLiteral extends Expr {
	kind: "StringLiteral";
	value: string;
}

export interface Property extends Expr {
	kind: "Property";
	key: string;
	value?: Expr;
}

export interface ObjectLiteral extends Expr {
	kind: "ObjectLiteral";
	name: string;
	key: string;
	properties: Property[];
}

export interface ReturnStmt extends Expr {
	kind: "ReturnStmt";
	value: Expr;
}

export interface GenericFunctionDeclaration extends Stmt {
	kind: "GenericFunctionDeclaration";
	name: string;
	typeVar: string;
}