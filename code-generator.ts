import { assertNever } from "./traverser";
export default function codeGenerator (node: Identifier | CallExpression | ValueExpression | ExpressionStatement | ASTTransformed): string {
  switch(node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'ExpressionStatement':
      return (
        `${codeGenerator(node.expression)};`
      )
    case 'CallExpression':
      return (
        `${codeGenerator(node.callee)}
        (
          ${node.arguments.map(codeGenerator).join(',')}
        )`
      )
    case 'Identifier':
      return node.name
    case 'NumberLiteral':
      return node.value
    case 'StringLiteral':
      return `'${node.value}'`
    default:
      return assertNever(node, node)
  }
}