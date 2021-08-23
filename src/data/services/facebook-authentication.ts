import { setup } from '@/domain/use-cases/authentication'
import { AccessToken, FacebookAccount } from '@/data/entities'
import { AuthenticationError } from '@/data/errors'

export const setupFacebookAuthentication: setup =
  (facebookApi, userAccountRepo, crypto) => async params => {
    const fbData = await facebookApi.loadUser(params)
    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
      const accessToken = await crypto.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }
    throw new AuthenticationError()
  }
