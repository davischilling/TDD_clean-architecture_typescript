import { FacebookAccount } from '@/data/entities'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookId: 'any_fb_facebookId'
  }
  it('should create with facebook data only', () => {
    const sut = new FacebookAccount(fbData)
    expect(sut).toEqual(fbData)
  })
  it('should update name if it is empty', () => {
    const accountData = { id: 'any_id' }
    const sut = new FacebookAccount(fbData, accountData)
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_facebookId'
    })
  })
  it('should not update name if it is present', () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const sut = new FacebookAccount(fbData, accountData)
    expect(sut).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_facebookId'
    })
  })
})
