"use client"

import type { SelectCompany, SelectMission } from "@/db/schema"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

type Response = {
  result: boolean
  searchResults: {
    Missions: SelectMission
    Company: SelectCompany
  }[]
}

export const useMissions = () => useQuery<Response>(routes.api.missions.list)
