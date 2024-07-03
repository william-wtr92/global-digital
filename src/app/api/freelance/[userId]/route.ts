import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { area, freelance, users } from "@/db/schema"

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
        { status: 404 },
      )
    }

    return Response.json(user[0])
  } catch (e) {
    return Response.json(
      { isError: true, message: "anErrorOccurred" },
      { status: 404 },
    )
  }
}
