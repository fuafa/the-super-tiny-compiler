export default function parser(tokens: TokenObject[]) {
  let current = 0

  function walk(): ASTChild {
    let token = tokens[current]

    if (token.type === 'number') {
      current += 1

      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    if (token.type === 'string') {
      current += 1

      return {
        ...token,
        type: 'StringLiteral',
      }
    }

    if (token.type === 'paren' && token.value === '(') {
      current += 1
      token = tokens[current]

      let node: ASTChild = {
        type: 'CallExpression',
        name: token.value,
        // Why infer params as never[] when no type notation?
        // Ahh, because --strictNullCheck is on
        // https://github.com/Microsoft/TypeScript/issues/13140
        params: []
      }

      current += 1
      token = tokens[current]

      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value === ')')
      ) {
        node.params.push(walk())
        token = tokens[current]
      }

      current += 1

      return node
    }

    throw new TypeError(token.type)
  }

  let ast: AST = {
    type: 'Program',
    body: [],
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}