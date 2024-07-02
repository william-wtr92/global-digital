import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

import { db } from "@/db/client"
import { freelance, users } from "@/db/schema"
import { signJWT } from "@/utils/jwt"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  try {
    const user = await db.insert(users).values(body).returning()

    await db.insert(freelance).values({
      userId: user[0].id,
      ...body,
    })

    const jwt = signJWT(user[0].id)

    cookies().set("Authorization", jwt.toString(), {
      maxAge: 60 * 60 * 24,
      sameSite: "strict",
    })

    return Response.json({ result: true })
  } catch (e) {
    return Response.json({ error: e }, { status: 500 })
  }
}
