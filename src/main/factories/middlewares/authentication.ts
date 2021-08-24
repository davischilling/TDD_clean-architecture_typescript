import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtToken } from '@/main/factories/infra'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtToken()
  return new AuthenticationMiddleware(jwt.validate.bind(jwt))
}
