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

export interface SaveFacebookAccoutRepository {
  saveWithFacebook: (params: SaveFacebookAccoutRepository.Params) => Promise<SaveFacebookAccoutRepository.Result>
}

export namespace SaveFacebookAccoutRepository {
  export type Params = {
    id?: string
    name: string
    email: string
    facebookId: string
  }
  export type Result = {
    id: string
  }
}
