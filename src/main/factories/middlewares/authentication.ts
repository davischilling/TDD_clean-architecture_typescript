import { AuthenticationMiddleware } from '@/application/middlewares'
import { setupAuthorize } from '@/data/services'
import { makeJwtTokenHandler } from '../crypto'

export const makeAuthenticationMiddleware = (): AuthenticationMiddleware => {
  const authorize = setupAuthorize(makeJwtTokenHandler())
  return new AuthenticationMiddleware(authorize)
}
