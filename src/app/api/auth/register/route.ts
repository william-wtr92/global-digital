import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { freelance, users } from "@/db/schema"
import { SC } from "@/utils/constants/status"
import { hashPassword } from "@/utils/hashPassword"
import { signJWT } from "@/utils/jwt"

export const runtime = "nodejs"

export const POST = async (req: NextRequest) => {
  const { profile, role } = await req.json()

  try {
    const [passwordHash, passwordSalt] = await hashPassword(profile.password)

    const user = await db
      .insert(users)
      .values({ ...profile, passwordHash, passwordSalt })
      .returning()

    role === "freelance" &&
      (await db.insert(freelance).values({
        userId: user[0].id,
        ...profile,
      }))

    const jwt = signJWT(user[0].id)

    cookies().set("Authorization", jwt.toString(), {
      secure: true,
      maxAge: appConfig.security.cookies.authExpiration,
      sameSite: "strict",
    })

    return Response.json({ result: true })
  } catch (e) {
    return Response.json(
      { error: e },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
