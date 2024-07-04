import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { freelance, users } from "@/db/schema"
import { hashPassword } from "@/utils/hashPassword"
import { signJWT } from "@/utils/jwt"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  try {
    const [passwordHash, passwordSalt] = await hashPassword(body.password)

    const user = await db
      .insert(users)
      .values({ ...body, passwordHash, passwordSalt })
      .returning()

    await db.insert(freelance).values({
      userId: user[0].id,
      ...body,
    })

    const jwt = signJWT(user[0].id)

    cookies().set("Authorization", jwt.toString(), {
      httpOnly: true,
      secure: true,
      maxAge: appConfig.security.cookies.authExpiration,
      sameSite: "strict",
    })

    return Response.json({ result: true })
  } catch (e) {
    return Response.json({ error: e }, { status: 500 })
  }
}
