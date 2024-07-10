import { count } from "drizzle-orm"

import { db } from "@/db/client"
import { company, freelance, mission } from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const GET = async () => {
  try {
    const missionCount = await db.select({ count: count() }).from(mission)
    const freelanceCount = await db.select({ count: count() }).from(freelance)
    const companyCount = await db.select({ count: count() }).from(company)

    const total = {
      missionCount: missionCount[0].count,
      freelanceCount: freelanceCount[0].count,
      companyCount: companyCount[0].count,
    }

    return Response.json({ result: true, total }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      { isError: true, message: "anErrorOccurred" },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
