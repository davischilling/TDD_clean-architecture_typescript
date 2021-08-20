import { setup } from '@/domain/middlewares'

export const setupAuthorize: setup = crypto => async params => {
  return await crypto.validateToken(params)
}
