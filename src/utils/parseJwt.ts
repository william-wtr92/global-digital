export type UserToken = {
  user: { id: string }
}

type Token = {
  payload: {
    user: {
      id: string
    }
  }
  iat: bigint
  exp: bigint
}

export const parseSession: (jwt: string) => UserToken = (jwt: string) =>
  (JSON.parse(atob(jwt.split(".")[1])) as Token).payload as UserToken
