import { HttpGetClient } from '@/data/contracts/http'
import axios from 'axios'

export class AxiosHttpClient {
  async get <T = any> (args: HttpGetClient.Params): Promise<T> {
    const { data } = await axios.get(args.url, { params: args.params })
    return data
  }
}
