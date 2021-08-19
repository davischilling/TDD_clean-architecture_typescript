import { FacebookAuthenticationService } from '@/domain/services'
import { makeFacebookApi } from '@/main/factories/apis'
import { makeJwtTokenGenerator } from '@/main/factories/crypto'
import { makePgUserAccount } from '@/main/factories/repos'

export const makeAuthenticationService = (): FacebookAuthenticationService => {
  return new FacebookAuthenticationService(
    makeFacebookApi(),
    makePgUserAccount(),
    makeJwtTokenGenerator()
  )
}
