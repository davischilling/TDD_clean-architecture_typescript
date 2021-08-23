import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '@/main/factories/middlewares'

export const authentication = adaptExpressMiddleware(makeAuthenticationMiddleware())
