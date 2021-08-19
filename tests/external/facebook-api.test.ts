import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api integration test', () => {
  it('should return undefined if token is invalid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })

  it('should return a facebook user if token is valid', async () => {
    const axiosClient = new AxiosHttpClient()
    const sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )

    const fbUser = await sut.loadUser({ token: 'EAADIsRHMMecBAM2HZAd7M1T4poqBUE6piND6vFPn9sVTlgJuK6iIHQBB5Tes33hDDjlI1IXX0IXO7OpZA56LlfHY9VhvldCu6Juj676CXk9JZA2hq60HFt1onsZCh531oLI8uZBUg5ErakPZBBLzKAGcuCIOOpmzlzhbrd3ckXD6tP69DZAyMcZCxz6Ok2lJqw5M5CeqhoOValHlk1DS1KZCR' })

    expect(fbUser).toEqual({
      facebookId: '179468364178517',
      name: 'Davi Test',
      email: 'davi_xxbyure_test@tfbnw.net'
    })
  })
})
