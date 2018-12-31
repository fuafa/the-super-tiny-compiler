type ASTComplete = (AST | ASTChild) & {_context?: any[]}

type Visitor = {
  [P in ASTType]: {
    // [K in 'enter' | 'exit']: (node: ASTComplete, parent: ASTComplete | null) => void
    enter: (node: ASTChild & {_context?: any[]}, parent: ASTComplete) => void,
    exit?: (node: ASTChild & {_context?: any[]}, parent: ASTComplete) => void
  }

  // Not Work
  // StringLiteral: {
  //   enter: (node: ASTChild<'StringLiteral'>, parent: ASTComplete) => void
  // }
  // NumberLiteral: {
  //   enter: (node: ASTChild<'NumberLiteral'>, parent: ASTComplete) => void,
  // }
  // CallExpression: {
  //   enter: (node: ASTChild<'CallExpression'>, parent: ASTComplete) => void,
  //   exit: (node: ASTChild<'CallExpression'>, parent: ASTComplete) => void,
  // }
}

type ValueVisitor = {
  [P in 'NumberLiteral' | 'StringLiteral']: {
    enter: (node: ASTChild<P>, parent: ASTComplete) => void
  }
}
type CallVisitor = {
  CallExpression: {
    enter: (node: ASTChild<'CallExpression'>, parent: ASTComplete) => void
    exit: (node: ASTChild<'CallExpression'>, parent: ASTComplete) => void
  }
}

export function assertNever(x: never, node: any): never {
  throw new TypeError(node.type)
}
export default function traverser(ast: AST, visitor: Visitor) {
  function traverseArray(array: ASTChild[], parent: ASTComplete) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }

  // function traverseNode(node: AST): void
  // function traverseNode(node: ASTChild, parent: ASTComplete): void
  function traverseNode(node: ASTComplete, parent?: ASTComplete): void {

    let methods
    if (node.type !== 'Program') {
      methods = visitor[node.type]
    }


    // when methods is ture, parent cannot be undefined, so use ! here
    if (node.type !== 'Program' && methods) {
      methods.enter(node, parent!)
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
      default:
        // When the return type is void, the Exhaustiveness checking fails,
        // so use the assertNever function instead
        assertNever(node, node)
    }

    if (node.type !== 'Program' && methods && methods.exit) {
      methods.exit(node, parent as ASTComplete)
    }
  }

  traverseNode(ast)
}