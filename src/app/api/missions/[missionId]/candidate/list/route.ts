import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { type SelectCandidate, candidate, users } from "@/db/schema"
import { SC } from "@/utils/constants/status"
import { sanitizeUser } from "@/utils/dto/sanitizeUser"

export const GET = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
  try {
    const candidates = await db
      .select()
      .from(candidate)
      .where(eq(candidate.missionId, missionId))
      .leftJoin(users, eq(candidate.userId, users.id))

    const sanitizedCandidates = candidates.map((candidate) => {
      return {
        Candidate: candidate.Candidate as SelectCandidate,
        Users: sanitizeUser(candidate.Users!),
      }
    })

    return Response.json(
      { result: true, candidates: sanitizedCandidates },
      { status: SC.success.OK },
    )
  } catch (e) {
    return Response.json(
      {
        isError: true,
        message: "Error occurred during fetching.",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
