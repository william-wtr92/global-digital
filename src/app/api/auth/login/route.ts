import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import { SC } from "@/utils/constants/status"
import { hashPassword } from "@/utils/hashPassword"
import { signJWT } from "@/utils/jwt"

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json()

  try {
    const user = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: SC.errors.NOT_FOUND },
      )
    }

    const [passwordHash] = await hashPassword(password, user[0].passwordSalt)

    if (passwordHash !== user[0].passwordHash) {
      return Response.json(
        { message: "Invalid password" },
        { status: SC.errors.UNAUTHORIZED },
      )
    }

    const jwt = signJWT(user[0].id)

    cookies().set("Authorization", jwt.toString(), {
      secure: true,
      sameSite: "strict",
      maxAge: appConfig.security.cookies.authExpiration,
    })

    return Response.json(
      { result: true, message: "Logged in." },
      { status: SC.success.OK },
    )
  } catch (e) {
    return Response.json(
      { result: false, message: "Login Failed!" },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
