import { db } from "@/db/client"
import { area } from "@/db/schema"

export const GET = async () => {
  try {
    const areas = await db.select().from(area)

    return Response.json(areas)
  } catch (e) {
    return Response.json({ error: e }, { status: 500 })
  }
}
