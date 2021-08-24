import { UserAccount } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

type LoadParams = UserAccount.LoadParams
type LoadResult = UserAccount.LoadResult

type FacebookSaveParams = UserAccount.FacebookSaveParams
type FacebookSaveResult = UserAccount.FacebookSaveResult

export class PgUserAccountRepository implements UserAccount {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })
    if (pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    } else {
      return undefined
    }
  }

  async saveWithFacebook ({ id, email, name, facebookId }: FacebookSaveParams): Promise<FacebookSaveResult> {
    const pgUserRepo = getRepository(PgUser)
    let resultId: string
    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })
      resultId = pgUser.id.toString()
    } else {
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
      resultId = id
    }
    return { id: resultId }
  }
}
