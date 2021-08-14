import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import {
  CreateFacebookAccoutRepository,
  LoadUserAccountRepository,
  UpdateFacebookAccoutRepository
} from '@/data/contracts/repos'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo:
    LoadUserAccountRepository &
    CreateFacebookAccoutRepository &
    UpdateFacebookAccoutRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const user = await this.userAccountRepo.load({ email: fbData.email })
      if (user !== undefined) {
        const { id, name } = user
        await this.userAccountRepo.updateWithFacebook({
          id,
          name: name ?? fbData.name,
          facebookId: fbData.facebookId
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbData)
      }
    }
    return new AuthenticationError()
  }
}
