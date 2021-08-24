import { FacebookAuthentication } from '@/domain/use-cases/authentication'
import { setupFacebookAuthentication } from '@/data/services'
import { makeFacebookApi, makeJwtToken, makePgUserAccount } from '@/main/factories/infra'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccount(),
    makeJwtToken()
  )
}
