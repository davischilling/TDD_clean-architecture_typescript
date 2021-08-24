import { FacebookLoginController } from '@/main/controllers'
import { makeFacebookAuthentication } from '@/main/factories/services'

export const makeFacebookLoginController = (): FacebookLoginController => {
  return new FacebookLoginController(makeFacebookAuthentication())
}
