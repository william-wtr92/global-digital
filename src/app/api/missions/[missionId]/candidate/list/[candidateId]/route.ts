import { and, eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { candidate } from "@/db/schema"
import { SC } from "@/def/status"

export const DELETE = async (
  req: NextRequest,
  {
    params: { missionId, candidateId },
  }: { params: { missionId: string; candidateId: string } },
) => {
  try {
    await db
      .delete(candidate)
      .where(
        and(eq(candidate.missionId, missionId), eq(candidate.id, candidateId)),
      )

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      {
        isError: true,
        message: "Error occurred during deleting.",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
