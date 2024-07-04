import { eq } from "drizzle-orm"
import { type JwtPayload, verify } from "jsonwebtoken"
import { type NextRequest } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { users } from "@/db/schema"
import { SC } from "@/utils/constants/status"
import { sanitizeUser } from "@/utils/dto/sanitizeUser"

export const GET = async (req: NextRequest) => {
  const cookies = req.cookies
  const jwt = cookies.get("Authorization")?.value

  if (!jwt) {
    return Response.json(
      { message: "No token provided" },
      { status: SC.errors.UNAUTHORIZED },
    )
  }

  try {
    const decoded = await verify(jwt, appConfig.security.jwt.secret)

    if (!decoded || typeof decoded === "string") {
      return Response.json(
        { message: "Failed to check your token" },
        { status: SC.errors.UNAUTHORIZED },
      )
    }

    const {
      payload: {
        user: { id },
      },
    } = decoded as JwtPayload

    const user = await db.select().from(users).where(eq(users.id, id))

    return Response.json(
      { result: true, userConnected: sanitizeUser(user[0]) },
      { status: SC.success.OK },
    )
  } catch (e) {
    return Response.json(
      { message: "User is not logged in" },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
