export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }
  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface CreateFacebookAccoutRepository {
  createFromFacebook: (params: CreateFacebookAccoutRepository.Params) => Promise<CreateFacebookAccoutRepository.Result>
}

export namespace CreateFacebookAccoutRepository {
  export type Params = {
    facebookId: string
    name: string
    email: string
  }
  export type Result = undefined
}

export interface UpdateFacebookAccoutRepository {
  updateWithFacebook: (params: UpdateFacebookAccoutRepository.Params) => Promise<UpdateFacebookAccoutRepository.Result>
}

export namespace UpdateFacebookAccoutRepository {
  export type Params = {
    id: string
    name: string
    facebookId: string
  }
  export type Result = undefined
}
