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
    const fbUser = await sut.loadUser({ token: 'EAADIsRHMMecBAEuWNylX6aWmBZBmDXGB5om4E1mq0ExCnbz6yk2SU5TWOYBXO7KpaG2ls1ywUP8GHtJHrwKPSTLILd1sZBTeoYZCJ4P69MerqaPnQCIbZA4rzzpBtBC80iZALLLIZC4gwRbfOL03pHJAy4m8frZBis8qtypADgptmTEgkiwEzvuyh5H6XurbmlaSm0zFyj8eQZDZD' })

    expect(fbUser).toEqual({
      facebookId: '179468364178517',
      name: 'Davi Test',
      email: 'davi_xxbyure_test@tfbnw.net'
    })
  })
})
