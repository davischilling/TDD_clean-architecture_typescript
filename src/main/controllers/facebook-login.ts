import { FacebookAuthentication, HttpInput, HttpOutput } from '@/domain/use-cases/authentication'
import { Controller } from '@/application/controllers'
import { HttpResponse, ok, unauthorized } from '@/application/helpers'
import { ValidationBuilder as validate, Validator } from '@/application/validation'

export class FacebookLoginController extends Controller {
  constructor (
    private readonly facebookAuthentication: FacebookAuthentication
  ) {
    super()
  }

  async perform ({ token }: HttpInput): Promise<HttpResponse<HttpOutput>> {
    try {
      const accessToken = await this.facebookAuthentication({ token })
      return ok(accessToken)
    } catch {
      return unauthorized()
    }
  }

  override buildValidators ({ token }: HttpInput): Validator[] {
    return [
      ...validate
        .of({ value: token, fieldName: 'token' })
        .required()
        .build()
    ]
  }
}
