import { FacebookAuthentication } from '@/domain/use-cases/authentication'
import { LoadFacebookUser } from '@/data/contracts/gateways'
import { Token } from '@/data/contracts/crypto'
import { UserAccount } from '@/data/contracts/repos'
import { AccessToken, FacebookAccount } from '@/data/entities'
import { AuthenticationError } from '@/data/errors'

export type setup = (
  facebook: LoadFacebookUser,
  userAccountRepo: UserAccount,
  crypto: Token
) => FacebookAuthentication

export const setupFacebookAuthentication: setup =
  (facebook, userAccountRepo, crypto) => async ({ token }) => {
    const fbData = await facebook.loadUser({ token })
    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({ email: fbData.email })
      const fbAccount = new FacebookAccount(fbData, accountData)
      const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
      const accessToken = await crypto.generate({ key: id, expirationInMs: AccessToken.expirationInMs })
      return { accessToken }
    }
    throw new AuthenticationError()
  }
