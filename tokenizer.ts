type Token = 
    'name' 
  | 'number' 
  | 'string' 
  | 'paren'

type TokenObject = {
  type: Token,
  value: string
}

export default function tokenizer(input: string): TokenObject[] {
  let current = 0

  let tokens: TokenObject[] = []

  while (current < input.length) {

    let char = input[current]
    
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })

      current++

      continue
    }

    let WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    let NUMBER = /\d/
    if (NUMBER.test(char)) {
      let value = ''

      while (NUMBER.test(char)) {
        value += char
        current += 1
        char = input[current]
      }

      tokens.push({
        type: 'number',
        value
      })

      continue
    }

    if (char === '"') {
      let value = ''

      current += 1
      char = input[current]

      while(char !== '"') {
        value += char
        current += 1
        char = input[current]
      }
      

      current += 1
      // char = input[current]

      tokens.push({
        type: 'string',
        value
      })

      continue
    }

    //FIXME: is a function name in Lisp cannot include number?
    const LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''

      while(LETTERS.test(char)) {
        value += char
        current += 1
        char = input[current]
      }

      tokens.push({
        type: 'name',
        value
      })

      continue
    }

    throw new TypeError(`Can not resolve this character: ${char}`)
  }

  return tokens
}