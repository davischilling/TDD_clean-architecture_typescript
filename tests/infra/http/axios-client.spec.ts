import { HttpGetClient } from '@/data/contracts/http'

import axios from 'axios'

jest.mock('axios')

class AxiosHttpClient {
  async get (args: HttpGetClient.Params): Promise<void> {
    await axios.get(args.url, { params: args.params })
  }
}

describe('AxiosHttpClient', () => {
  const fakeAxios = axios as jest.Mocked<typeof axios>
  let sut: AxiosHttpClient

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('get', () => {
    it('should call get with correct params', async () => {
      await sut.get({
        url: 'any_url',
        params: {
          any: 'any'
        }
      })

      expect(fakeAxios.get).toHaveBeenCalledWith(
        'any_url',
        {
          params: {
            any: 'any'
          }
        }
      )
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })
  })
  // describe('post', () => {
  //   it('', () => {

  //   })
  // })
})
