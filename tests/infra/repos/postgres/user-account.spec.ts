import { LoadUserAccountRepository, SaveFacebookAccoutRepository } from '@/data/contracts/repos'

import { newDb, IMemoryDb } from 'pg-mem'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  Connection,
  Repository
} from 'typeorm'

class PgUserAccountRepository implements LoadUserAccountRepository {
  async load (params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    } else {
      return undefined
    }
  }

  async saveWithFacebook (params: SaveFacebookAccoutRepository.Params): Promise<void> {

  }
}

@Entity({ name: 'usuarios' })
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebookId?: string
}

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let db: IMemoryDb
  let connection: Connection
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    db = newDb()
    connection = await db.adapters.createTypeormConnection({
      type: 'postgres',
      entities: [PgUser]
    })
    await connection.synchronize()
    pgUserRepo = getRepository(PgUser)
  })

  beforeEach(async () => {
    await pgUserRepo.save({ email: 'existing_email' })
    sut = new PgUserAccountRepository()
  })

  afterEach(async () => {
    await pgUserRepo.clear()
  })

  afterAll(async () => {
    await connection.close()
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
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
