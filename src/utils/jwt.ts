import jsonwebtoken from "jsonwebtoken"
import { NextResponse } from "next/server"

import appConfig from "@/config/appConfig"

export const signJWT = (userId: string) => {
  if (!appConfig.security.jwt.secret) {
    return NextResponse.json(
      { error: { message: "Need jwt secret" } },
      { status: 500 },
    )
  }

  return createJwt(userId, firstName, lastName)
}

export const createJwt = (id: string, firstName: string, lastName: string) =>
  jsonwebtoken.sign(
    {
      payload: {
        user: {
          id,
          firstName,
          lastName,
        },
      },
    },
    appConfig.security.jwt.secret,
    { expiresIn: appConfig.security.jwt.expiresIn },
  )
