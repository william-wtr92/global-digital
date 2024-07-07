"use client"

import type { SelectCandidate, SelectUser } from "@/db/schema"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

type Response = {
  result: boolean
  candidates: {
    Candidate: SelectCandidate
    Users: SelectUser
  }[]
}

export const useCandidates = (missionId: string) =>
  useQuery<Response>(routes.api.missions.candidate.list(missionId))
