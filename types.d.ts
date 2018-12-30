type Token = "name" | "number" | "string" | "paren";

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

// type TokenObject = {
//   type: Token,
//   value: string
// }
