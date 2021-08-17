import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { FakeDb, makeFakeDb } from '@/tests/infra/postgres/mocks'

import { getRepository, Repository } from 'typeorm'

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pg: FakeDb
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    pg = await makeFakeDb([PgUser])
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(async () => {
    pg.backup.restore()
    sut = new PgUserAccountRepository()
  })

  afterAll(async () => {
    await pg.connection.close()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'existing_email' })

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return undefined if email does not exist', async () => {
      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
    })
  })

  describe('saveWithFacebook', () => {
    it('should create an account if id is undefined', async () => {
      await sut.saveWithFacebook({
        email: 'any_email',
        name: 'any_name',
        facebookId: 'any_fb_id'
      })
      const pgUser = await pgUserRepo.findOne({ email: 'any_email' })

      expect(pgUser?.id).toBe(1)
    })
  })
})
