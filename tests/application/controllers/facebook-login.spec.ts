import { FacebookAuthentication } from '@/domain/features'
import { FacebookLoginController } from '@/application/controllers'
import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '@/domain/errors'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator, ValidationComposite } from '@/application/validation'

import { mock, MockProxy } from 'jest-mock-extended'
import { mocked } from 'ts-jest/utils'

jest.mock('@/application/validation/composite')

describe('FacebookLoginController', () => {
  let token: string
  let facebookAuthentication: MockProxy<FacebookAuthentication>
  let sut: FacebookLoginController

  beforeAll(() => {
    token = 'any_token'
    facebookAuthentication = mock()
    facebookAuthentication.perform.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuthentication)
  })

  it('should return 400 if required field validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)

    const httpResponse = await sut.handle({ token: '' })

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredStringValidator('', 'token')
    ])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call FacebookAuthentication.perform with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuthentication.perform).toHaveBeenCalledWith({ token })
    expect(facebookAuthentication.perform).toHaveBeenCalledTimes(1)
  })

  it('should return 401 if authentication fails', async () => {
    facebookAuthentication.perform.mockResolvedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError()
    })
  })

  it('should return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value'
      }
    })
  })

  it('should return 500 if authentication throws', async () => {
    const error = new Error('infra_error')
    facebookAuthentication.perform.mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error)
    })
  })
})
