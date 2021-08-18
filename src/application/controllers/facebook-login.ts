import { AuthenticationError, ServerError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { httpResponse } from '@/application/helpers'

export class FacebookLoginController {
  constructor (
    private readonly facebookAuthentication: FacebookAuthentication
  ) {}

  async handle (httpRequest: any): Promise<httpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return {
          statusCode: 400,
          data: new Error('The field token is required')
        }
      }
      const result = await this.facebookAuthentication.perform(httpRequest)
      if (result instanceof AuthenticationError) {
        return {
          statusCode: 401,
          data: result
        }
      } else {
        return {
          statusCode: 200,
          data: {
            accessToken: result.value
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
