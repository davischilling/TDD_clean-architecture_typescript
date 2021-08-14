import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccoutRepo: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService
  const token: string = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      facebookId: 'any_fb_id',
      name: 'any_fb_name',
      email: 'any_fb_email'
    })
    loadUserAccoutRepo = mock()
    sut = new FacebookAuthenticationService(
      loadFacebookUserApi,
      loadUserAccoutRepo
    )
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })
  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const authResult = await sut.perform({ token })
    expect(authResult).toEqual(new AuthenticationError())
  })
  it('should call LoadUserAccountRepo when LoadFacebookUserApi returns data', async () => {
    await sut.perform({ token })
    expect(loadUserAccoutRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(loadUserAccoutRepo.load).toHaveBeenCalledTimes(1)
  })
})
