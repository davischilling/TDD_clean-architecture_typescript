import { ForbiddenError } from '@/application/errors'
import { app } from '@/main/config/app'
import request from 'supertest'
import { authentication } from '@/main/middlewares'

describe('Authentication Middleware', () => {
  it('should return 403 if authorization header was not provided', async () => {
    app.get('/fake_route', authentication)

    const { status, body } = await request(app).get('/fake_route')

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
