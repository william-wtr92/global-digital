import { pbkdf2 as pbkdf2Callback, randomBytes } from "crypto"
import { promisify } from "util"

import appConfig from "@/config/appConfig"

const pbkdf2 = promisify(pbkdf2Callback)
const {
  security: {
    password: { saltlen, keylen, iterations, digest, pepper },
  },
} = appConfig

export const hashPassword = async (
  password: string,
  salt: string = randomBytes(saltlen).toString("hex"),
) => {
  const key = await pbkdf2(
    `${password}${pepper}`,
    salt,
    iterations,
    keylen,
    digest,
  )

  return [key.toString("hex"), salt]
}
