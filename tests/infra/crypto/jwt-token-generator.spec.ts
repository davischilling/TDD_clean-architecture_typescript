import { TokenGenerator } from '@/data/contracts/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenGenerator {
  constructor (
    private readonly secret: string
  ) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: params.key }, this.secret, { expiresIn: expirationInSeconds })
  }
}

describe('JwtTokenGenerator', () => {
  let secret: string
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtTokenGenerator

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    // mockImplementation não só retorna o valor,
    // mas modifica a implementação do método
    // para que o valor possa ser retornado
    fakeJwt.sign.mockImplementation(() => 'any_token')
  })

  beforeEach(() => {
    secret = 'any_secret'
    sut = new JwtTokenGenerator(secret)
  })

  it('should call jwt.sign with correct params', async () => {
    await sut.generateToken({ key: 'any_key', expirationInMs: 1000 })

    expect(fakeJwt.sign).toHaveBeenCalledWith(
      { key: 'any_key' },
      secret,
      { expiresIn: 1 }
    )
    expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
  })

  it('should return a token', async () => {
    const token = await sut.generateToken({ key: 'any_key', expirationInMs: 1000 })

    expect(token).toBe('any_token')
  })
})
