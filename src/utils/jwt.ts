import jsonwebtoken from "jsonwebtoken"

import appConfig from "@/config/appConfig"

export const signJWT = (userId: string) => {
  if (!appConfig.security.jwt.secret) {
    return Response.json(
      { error: { message: "Need jwt secret" } },
      { status: 500 },
    )
  }

  return createJwt(userId)
}

export const createJwt = (id: string) =>
  jsonwebtoken.sign(
    {
      payload: {
        user: {
          id,
        },
      },
    },
    appConfig.security.jwt.secret,
    { expiresIn: appConfig.security.jwt.expiresIn },
  )
