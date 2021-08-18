import { badRequest, HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { RequiredStringValidator } from '../validation'

type HttpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController {
  constructor (
    private readonly facebookAuthentication: FacebookAuthentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }
      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AuthenticationError) {
        return unauthorized()
      } else {
        return ok({ accessToken: accessToken.value })
      }
    } catch (error: any) {
      return serverError(error)
    }
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    const validator = new RequiredStringValidator(httpRequest.token, 'token')
    return validator.validate()
  }
}
