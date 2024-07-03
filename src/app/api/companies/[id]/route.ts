import { eq } from "drizzle-orm"

import { db } from "@/db/client"
import { company } from "@/db/schema"
import { SC } from "@/def/status"

export const GET = async (
  req: Request,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const companyData = await db
      .select()
      .from(company)
      .where(eq(company.id, id))

    return Response.json(companyData[0])
  } catch (error) {
    return Response.json(
      { error },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
