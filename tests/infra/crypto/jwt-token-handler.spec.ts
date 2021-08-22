import { JwtTokenHandler } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let secret: string
  let fakeJwt: jest.Mocked<typeof jwt>
  let sut: JwtTokenHandler

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
  })

  beforeEach(() => {
    secret = 'any_secret'
    sut = new JwtTokenHandler(secret)
  })

  describe('generateToken', () => {
    let key: string
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      expirationInMs = 1000
      // mockImplementation é usado em métodos síncronos,
      // modificando a implementação do método
      // para que o valor possa ser retornado
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call jwt.sign with correct params', async () => {
      await sut.generateToken({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith(
        { key },
        secret,
        { expiresIn: 1 }
      )
      expect(fakeJwt.sign).toHaveBeenCalledTimes(1)
    })

    it('should return a token on success', async () => {
      const generatedToken = await sut.generateToken({ key, expirationInMs })

      expect(generatedToken).toBe(token)
    })

    it('should rethrow if jwt.sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generateToken({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })

  describe('validateToken', () => {
    let key: string
    let token: string

    beforeAll(() => {
      key = 'any_key'
      token = 'any_token'
      fakeJwt.verify.mockImplementation(() => ({ key }))
    })

    it('should call jwt.verify with correct params', async () => {
      await sut.validateToken({ token })

      expect(fakeJwt.verify).toHaveBeenCalledWith(token, secret)
      expect(fakeJwt.verify).toHaveBeenCalledTimes(1)
    })

    it('should return the key used to sign', async () => {
      const generatedKey = await sut.validateToken({ token })

      expect(generatedKey).toBe(key)
    })
  })
})
