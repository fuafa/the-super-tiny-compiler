type Token = "name" | "number" | "string" | "paren";

// Less precise
// type TokenObject = {
//   type: Token,
//   value: string
// }

// FIXME: not work
type TokenObjectNotWork<
  T extends Token,
  S = T extends "paren" ? "(" | ")" : string
> = {
  type: T;
  value: S;
};

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
}

type ASTChild<
  T extends ASTType = ASTType,
  S = T extends "CallExpression"
    ? { type: T; name: string; params: Array<ASTChild> }
    : { type: T; value: string }
> = S;
