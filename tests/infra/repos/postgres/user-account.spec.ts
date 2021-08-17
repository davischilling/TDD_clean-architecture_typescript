import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { PgUser } from '@/infra/postgres/entities'

import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { Connection, EntityTarget, getRepository, Repository } from 'typeorm'

type FakeDb = {
  connection: Connection
  backup: IBackup
}

const makeFakeDb = async (entities: Array<EntityTarget<any>>): Promise<FakeDb> => {
  const db: IMemoryDb = newDb()
  const connection: Connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities
  })
  await connection.synchronize()
  const backup: IBackup = db.backup()
  return { connection, backup }
}

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

  // describe('saveWithFacebook', () => {
  //   it('should save user with correct params', () => {

  //   })
  // })
})
