import { LoadUserAccountRepository, SaveFacebookAccoutRepository } from '@/data/contracts/repos'
import { getRepository } from 'typeorm'
import { PgUser } from '@/infra/postgres/entities'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result

type FacebookSaveParams = SaveFacebookAccoutRepository.Params
type FacebookSaveResult = SaveFacebookAccoutRepository.Result

export class PgUserAccountRepository implements LoadUserAccountRepository, SaveFacebookAccoutRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load (params: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ email: params.email })
    if (pgUser != null) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    } else {
      return undefined
    }
  }

  async saveWithFacebook (params: FacebookSaveParams): Promise<FacebookSaveResult> {
    const { id, email, name, facebookId } = params
    let resultId: string
    if (id === undefined) {
      const pgUser = await this.pgUserRepo.save({
        email,
        name,
        facebookId
      })
      resultId = pgUser.id.toString()
    } else {
      await this.pgUserRepo.update({
        id: parseInt(id)
      }, {
        name,
        facebookId
      })
      resultId = id
    }
    return { id: resultId }
  }
}
