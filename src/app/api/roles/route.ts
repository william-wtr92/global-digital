import { db } from "@/db/client"
import { role } from "@/db/schema"
import { SC } from "@/def/status"

export const GET = async () => {
  try {
    const roles = await db.select().from(role)

    return Response.json(roles)
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
