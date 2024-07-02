import { eq } from "drizzle-orm"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import { hashPassword } from "@/utils/hashPassword"
import { signJwt } from "@/utils/jwtActions"

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json()

  try {
    const user = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const [passwordHash] = await hashPassword(password, user[0].passwordSalt)

    if (passwordHash !== user[0].passwordHash) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    const jwt = signJwt({
      id: user[0].id,
      email: user[0].email,
    })

    cookies().set("Authorization", jwt, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: appConfig.security.cookies.authExpiration,
    })

    return NextResponse.json(
      { result: true, message: "Logged in." },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json(
      { result: false, message: "Login Failed!" },
      { status: 500 },
    )
  }
}
