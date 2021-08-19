import { FacebookLoginController } from '@/application/controllers'
import { makeAuthenticationService } from '@/main/factories/use-cases'

export const makeFacebookLoginController = (): FacebookLoginController => {
  const fbAuthService = makeAuthenticationService()
  return new FacebookLoginController(fbAuthService)
}
