import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '../factories/middlewares'

export const authentication = adaptExpressMiddleware(makeAuthenticationMiddleware())
