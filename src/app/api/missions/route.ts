import { desc, like, and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

import { db } from "@/db/client"
import { company, mission } from "@/db/schema"
import { SC } from "@/def/status"

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const searchQuery = url.searchParams.get("search") || ""

  try {
    const searchResults = await db
      .select()
      .from(mission)
      .leftJoin(company, eq(mission.companyId, company.id))
      .where(
        and(
          like(mission.title, `%${searchQuery}%`),
          like(company.businessName, `%${searchQuery}%`),
        ),
      )
      .orderBy(desc(mission.createdAt))

    return NextResponse.json(
      { result: true, searchResults },
      { status: SC.success.OK },
    )
  } catch (e) {
    return NextResponse.json(
      { error: e },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
