import { LoadUserAccountRepository, SaveFacebookAccoutRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

export class PgUserAccountRepository implements LoadUserAccountRepository {
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
    const pgUserRepo = getRepository(PgUser)
    const { id, email, name, facebookId } = params
    if (id === undefined) {
      await pgUserRepo.save({
        email,
        name,
        facebookId
      })
    } else {
      await pgUserRepo.update({
        id: parseInt(id)
      }, {
        name,
        facebookId
      })
    }
  }
}
