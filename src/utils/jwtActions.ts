import jwt from "jsonwebtoken"

import appConfig from "@/config/appConfig"

export const signJwt = <T extends object>(payload: T, expiration?: number) => {
  return jwt.sign(payload, appConfig.security.jwt.secret, {
    algorithm: appConfig.security.jwt.algorithm,
    expiresIn: expiration ? expiration : appConfig.security.jwt.expiresIn,
  })
}
