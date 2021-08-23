import { Middleware } from '@/application/middlewares'

import { RequestHandler } from 'express'

type adapter = (middleware: Middleware) => RequestHandler

export const adaptExpressMiddleware: adapter = middleware => async (req, res, next) => {
  const { statusCode, data } = await middleware.handle({ ...req.headers })
  if (statusCode === 200) {
    const entries = Object.entries(data).filter(entry => entry[1])
    req.locals = { ...req.locals, ...Object.fromEntries(entries) }
    next()
  } else {
    res.status(statusCode).json(data)
  }
}
