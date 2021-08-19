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
    const fbUser = await sut.loadUser({ token: 'EAADIsRHMMecBALSXGZB3l8ZBZAMgb1pmTF5QIzeD10CVxq3abIc7wtXeznXdYKQekpZCaCVYYIcNDGDh1Uvzz2K1fBDsRIZBp1jJm14OJaekJRQMZAqr2P7hGQ6eqZCwxeMTYFVrJ6vzJdfOqXMuQqxntn8nvZAEkXlhFK02GDgob6MsDyKpQsCK7G8lISHxB86BrgP8XlVARgZDZD' })

    expect(fbUser).toEqual({
      facebookId: '179468364178517',
      name: 'Davi Test',
      email: 'davi_xxbyure_test@tfbnw.net'
    })
  })
})
