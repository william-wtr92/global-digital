"use client"

import type { SelectCompany, SelectMission } from "@/db/schema"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

type Response = {
  result: boolean
  detailedMission: {
    Missions: SelectMission
    Company: SelectCompany
    isEmployee: boolean
  }
}

export const useMission = (missionId: string) =>
  useQuery<Response>(routes.api.missions.detailedMission(missionId))
