import { FacebookAuthentication } from '@/domain/use-cases/authentication'
import { setupFacebookAuthentication } from '@/data/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenHandler } from '@/main/factories/crypto'
import { makePgUserAccount } from '@/main/factories/repos'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccount(),
    makeJwtTokenHandler()
  )
}
