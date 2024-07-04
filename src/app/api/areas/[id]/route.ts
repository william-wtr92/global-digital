import { eq } from "drizzle-orm"

import { db } from "@/db/client"
import { area } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const GET = async (
  request: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const areaData = await db.select().from(area).where(eq(area.id, id!))

    return Response.json(areaData[0])
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
