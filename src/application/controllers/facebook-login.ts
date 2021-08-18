import { FacebookAuthentication } from '@/domain/features'
import { badRequest, HttpResponse, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { ServerError, RequiredFieldError } from '@/application/errors'

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
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value
          }
        }
      }
    } catch (error: any) {
      return {
        statusCode: 500,
        data: new ServerError(error)
      }
    }
  }
}
