import jsonwebtoken from "jsonwebtoken"
import { NextResponse } from "next/server"

import configuration from "@/config"

export const signJWT = (userId: string) => {
  if (!configuration.security.jwt.secret) {
    return NextResponse.json(
      { error: { message: "Need jwt secret" } },
      { status: 500 },
    )
  }

  return createJwt(userId)
}

export const createJwt = (userId: string) =>
  jsonwebtoken.sign(
    {
      payload: {
        user: {
          id: userId,
        },
      },
    },
    configuration.security.jwt.secret,
    { expiresIn: configuration.security.jwt.expiresIn },
  )
