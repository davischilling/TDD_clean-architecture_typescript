import { TokenValidator } from '@/domain/contracts/crypto'

type Input = { token: string }
type Output = string

export type Authorize = (params: Input) => Promise<Output>

export type setup = (crypto: TokenValidator) => Authorize
