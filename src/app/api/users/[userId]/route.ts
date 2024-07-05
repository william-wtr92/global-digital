import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { area, freelance, users } from "@/db/schema"
import { SC } from "@/def/status"

export const GET = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) => {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .leftJoin(freelance, eq(freelance.userId, userId))
      .leftJoin(area, eq(freelance.areaId, area.id))

    if (!user.length) {
      return Response.json(
        { isError: true, message: "userNotFound" },
        { status: SC.errors.NOT_FOUND },
      )
    }

    return Response.json(user[0])
  } catch (e) {
    return Response.json(
      { isError: true, message: "anErrorOccurred" },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
