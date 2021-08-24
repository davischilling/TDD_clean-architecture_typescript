export type HttpInput = { token: string }
export type HttpOutput = { accessToken: string } | Error

export type FacebookAuthentication = (params: HttpInput) => Promise<HttpOutput>
