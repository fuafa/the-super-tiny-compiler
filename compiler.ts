import tokenizer from './tokenizer'
import parser from './parser'
import trasformer from './transformer'
import codeGenerator from './code-generator'
import transformer from './transformer';


export default function (input: string) {
  const tokens = tokenizer(input)
  const ast = parser(tokens)
  const newAst = transformer(ast)
  const output = codeGenerator(newAst)

  return output
}
