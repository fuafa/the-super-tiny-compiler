type Token = 
    'name' 
  | 'number' 
  | 'string' 
  | 'paren'

type TokenObject = {
  type: Token,
  value: string
}