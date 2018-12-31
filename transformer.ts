import traverser from "./traverser";

export default function (ast: AST): ASTTransformed {
  let newAst: ASTTransformed = {
    type: 'Program',
    body: []
  }

  ast._context = newAst.body

  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        // ugly.......
        parent._context!.push({
          type: 'NumberLiteral',
          value: (node as ASTChild<'NumberLiteral'>).value
        })
      },
      // exit(node, parent) {}
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context!.push({
          type: 'StringLiteral',
          value: (node as ASTChild<'StringLiteral'>).value
        })
      }
    },

    CallExpression: {
      enter(node, parent) {
        let expression: CallExpression | ExpressionStatement = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: (node as ASTChild<'CallExpression'>).name
          },
          arguments: []
        }

        node._context = expression.arguments

        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression
          }
        }

        parent._context!.push(expression)
      },
      // exit(node, parent) {}
    },

    // FIXME:
    // Program: {
    //   enter(node, parent) {}
    // }
  })

  return newAst
}