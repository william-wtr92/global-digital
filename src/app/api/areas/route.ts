import { db } from "@/db/client"
import { area } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const GET = async () => {
  try {
    const areas = await db.select().from(area)

    return Response.json(areas)
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
