export interface UserAccount {
  load: (params: UserAccount.LoadParams) => Promise<UserAccount.LoadResult>
  saveWithFacebook: (params: UserAccount.FacebookSaveParams) => Promise<UserAccount.FacebookSaveResult>
}

export namespace UserAccount {
  export type LoadParams = { email: string }
  export type LoadResult = undefined | { id: string, name?: string }

  export type FacebookSaveParams = {
    id?: string
    name: string
    email: string
    facebookId: string
  }
  export type FacebookSaveResult = { id: string }
}
