import { eq } from "drizzle-orm"

import { db } from "@/db/client"
import { mission } from "@/db/schema"
import { SC } from "@/def/status"

export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const missionsData = await db
      .select()
      .from(mission)
      .where(eq(mission.companyId, id!))

    return Response.json(missionsData)
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}