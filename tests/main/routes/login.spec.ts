import { UnauthorizedError } from '@/application/errors'
import { PgUser } from '@/infra/postgres/entities'
import { app } from '@/main/config/app'
import { FakeDb, makeFakeDb } from '@/tests/infra/postgres/mocks'

import request from 'supertest'

describe('Login Routes', () => {
  let pg: FakeDb
  // const loadUserSpy = jest.fn()

  // jest.mock('@/infra/apis/facebook', () => ({
  //   FacebookApi: jest.fn().mockReturnValue({
  //     loadUser: loadUserSpy
  //   })
  // }))

  beforeAll(async () => {
    pg = await makeFakeDb([PgUser])
  })

  beforeEach(async () => {
    pg.backup.restore()
  })

  afterAll(async () => {
    await pg.connection.close()
  })

  describe('POST /login/facebook', () => {
    // it('should return 200 with AccessToken', async () => {
    //   loadUserSpy.mockResolvedValueOnce({
    //     facebookId: 'any_id', name: 'any_name', email: 'any_email'
    //   })

    //   const { status, body } = await request(app)
    //     .post('/api/login/facebook')
    //     .send({ token: 'valid_token' })

    //   expect(status).toBe(200)
    //   expect(body.accessToken).toBeDefined()
    // })

    it('should return 401 with AnauthorizedError', async () => {
      const { status, body } = await request(app)
        .post('/api/login/facebook')
        .send({ token: 'invalid_token' })

      expect(status).toBe(401)
      expect(body.error).toEqual(new UnauthorizedError().message)
    })
  })
})
