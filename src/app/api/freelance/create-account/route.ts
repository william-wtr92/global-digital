import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

import { db } from "@/db/client"
import { freelance, users } from "@/db/schema"
import { signJWT } from "@/utils/jwt"

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  try {
    const user = await db
      .insert(users)
      .values({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        avatarUrl: body.avatarUrl,
        phoneNumber: body.phoneNumber,
        isVerified: false,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
      })
      .returning()

    await db.insert(freelance).values({
      userId: user[0].id,
      jobTitle: body.jobTitle,
      businessName: body.businessName,
      areaId: body.areaId,
      localisation: body.localisation,
      registrationNumber: body.registrationNumber,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    })

    const jwt = signJWT(user[0].id)

    cookies().set("Authorization", jwt.toString(), {
      maxAge: 60 * 60 * 24,
      httpOnly: true,
      sameSite: "strict",
    })

    return Response.json({ result: true })
  } catch (e) {
    return Response.json({ error: e }, { status: 500 })
  }
}
