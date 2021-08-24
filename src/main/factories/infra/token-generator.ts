import { JwtToken } from '@/infra/crypto'
import { env } from '@/main/config/env'

export const makeJwtToken = (): JwtToken => {
  return new JwtToken(env.jwtSecret)
}
