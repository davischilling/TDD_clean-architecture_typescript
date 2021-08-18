import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'

export class FacebookLoginController {
  constructor (
    private readonly facebookAuthentication: FacebookAuthentication
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }
      const accessToken = await this.facebookAuthentication.perform(httpRequest)
      if (accessToken instanceof AuthenticationError) {
        return unauthorized()
      } else {
        return ok({ accessToken: accessToken.value })
      }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
