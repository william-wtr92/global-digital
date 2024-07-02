import { db } from "@/db/client"

export const GET = async () => {
  try {
    const areas = await db.query.area.findMany()

    return Response.json(areas)
  } catch (err) {
    return Response.json({ error: "An unexpected error" }, { status: 500 })
  }
}
