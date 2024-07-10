"use client"

import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

type Response = {
  result: boolean
  isUserAlreadyCandidate: boolean
}

export const useCandidate = (missionId: string) =>
  useQuery<Response>(routes.api.missions.candidate.isCandidate(missionId))
