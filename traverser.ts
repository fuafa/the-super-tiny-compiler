type ASTComplete = AST | ASTChild
type Visitor = {
  [P in ASTType | 'Program']: {
    [K in 'enter' | 'exit']: (node: ASTComplete, parent: ASTComplete | null) => void
  }
}

export function traverser(ast: AST, visitor: Visitor) {
  function traverseArray(array: ASTChild[], parent: ASTComplete) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }

  function traverseNode(node: AST, parent: null): void
  function traverseNode(node: ASTChild, parent: ASTComplete): void
  function traverseNode(node: ASTComplete, parent: ASTComplete | null): void {
    let methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break;
      case 'CallExpression':
        traverseArray(node.params, node)
        break;
      case 'NumberLiteral':
      case 'StringLiteral':
        break;
      // default:
      //   throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }

  traverseNode(ast, null)
}