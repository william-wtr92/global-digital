import { and, eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { candidate, mission } from "@/db/schema"
import { SC } from "@/utils/constants/status"

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

export const PATCH = async (
  req: NextRequest,
  {
    params: { missionId, candidateId },
  }: { params: { missionId: string; candidateId: string } },
) => {
  try {
    await db.transaction(async (tx) => {
      await tx
        .update(candidate)
        .set({ status: "accepted" })
        .where(
          and(
            eq(candidate.missionId, missionId),
            eq(candidate.id, candidateId),
          ),
        )

      await tx
        .delete(candidate)
        .where(
          and(
            eq(candidate.missionId, missionId),
            and(eq(candidate.id, candidateId), eq(candidate.status, "pending")),
          ),
        )

      await tx
        .update(mission)
        .set({ status: "in progress" })
        .where(eq(mission.id, missionId))
    })

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      {
        isError: true,
        message: "Error occurred during updating.",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
