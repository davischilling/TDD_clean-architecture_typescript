import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration test', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })

  it('should return a facebook user if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAADIsRHMMecBAKQtLIhqvsU0KVFH4eKFOz4inpWd8HPgtL4fkHiZCnzxS2ZAu8OZBj8GZAAg2tWhTmYVn2NWQ7jr6t5nTjiB9luxvgKwlU8xZB0i4lWjX7kWKJk1rJ7AZCKRqEgJZBCNORgvtsLYhkg7mvmDFFjWKFHbPHz2JvLijS3uYPZAi5sY0yrNI5YPZBPwlRqC6xYCbewZDZD' })

    expect(fbUser).toEqual({
      facebookId: '179468364178517',
      name: 'Davi Test',
      email: 'davi_xxbyure_test@tfbnw.net'
    })
  })
})
