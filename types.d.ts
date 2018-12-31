type Token = "name" | "number" | "string" | "paren";

// Less precise
// type TokenObject = {
//   type: Token,
//   value: string
// }

// FIXME: not work
// type TokenObjectNotWork<
//   T extends Token,
//   S = T extends "paren" ? "(" | ")" : string
// > = {
//   type: T;
//   value: S;
// };

// Fixed option of TokenObjectNotWork
type TokenObject<
  T extends Token = Token,
  S = T extends "paren"
    ? { type: T; value: "(" | ")" }
    : { type: T; value: string }
> = S;


type ASTType = "CallExpression" | "NumberLiteral" | "StringLiteral";
// Less precise
// type AST = {
//   type: ASTType;
//   body?: Array<AST>;
//   name?: string;
//   value?: string;
//   params?: Array<AST>;
// };

type AST = {
  type: 'Program',
  body: ASTChild[]
  _context?: Array<ExpressionStatement | ValueExpression>
}

type ASTChild<
  T extends ASTType = ASTType,
  S = T extends "CallExpression"
    ? { type: T; name: string; params: Array<ASTChild> }
    : { type: T, value: string}
    // : T extends 'NumberLiteral'
    // ? { type: T; value: string; _context: Array<ValueExpression<'NumberLiteral'>> }
    // : { type: T; value: string; _context: Array<ValueExpression<'StringLiteral'>> }
> = S;

// interface TT<
//   T extends ASTType = ASTType,
//   S = T extends 'CallExpression'
//     ? { name: string, params: Array<ASTChild>, _context?: Array<ExpressionStatement | CallExpression | ValueExpression>}
//     : { value: string }
// > {
//   type: T
// }

type ASTTransformed = {
  type: 'Program',
  body: Array<ExpressionStatement | ValueExpression>
}

// type ASTTypeTransformed = 'ExpressionStatement' | 'CallExpression' | 'Identifier' | 'NumberLiteral' | 'StringLiteral'

// type ASTChildTransformed<
//   T extends ASTTypeTransformed = ASTTypeTransformed,
//   S = T extends 'ExpressionStatement'
//     ? {type: T, expression: ASTChildTransformed}
//     : T extends 'CallExpression'
//     ? {type: T, callee: ASTChildTransformed, }
// > = S
type ExpressionStatement = {
  type: 'ExpressionStatement',
  expression: CallExpression
}

type CallExpression = {
  type: 'CallExpression',
  callee: Identifier,
  arguments: ValueExpression[] 
}

type Identifier = {
  type: 'Identifier',
  name: string
}

type ValueExpression<T extends 'NumberLiteral' | 'StringLiteral' = 'NumberLiteral' | 'StringLiteral'> = {
  type: T,
  value: string
}

