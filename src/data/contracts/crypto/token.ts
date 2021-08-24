export interface Token {
  generate: (params: Token.GenerateParams) => Promise<Token.GenerateResult>
  validate: (params: Token.ValidateParams) => Promise<Token.ValidateResult>
}

export namespace Token {
  export type GenerateParams = {
    key: string
    expirationInMs: number
  }
  export type GenerateResult = string

  export type ValidateParams = { token: string }
  export type ValidateResult = string
}
