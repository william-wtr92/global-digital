import { useQuery } from "@tanstack/react-query"

import type { SelectCompany, SelectMission } from "@/db/schema"
import { apiFetch } from "@/lib/api"
import routes from "@/web/routes"

type Response = {
  result: boolean
  detailedMission: {
    Missions: SelectMission
    Company: SelectCompany
    isEmployee: boolean
  }
}

const fetchMission = async (missionId: string) => {
  const response = await apiFetch<Response>({
    url: routes.api.missions.detailedMission(missionId),
    method: "GET",
    credentials: "include",
  })

  return response.data
}

export const useMission = (missionId: string) => {
  const { ...query } = useQuery<Response>({
    queryKey: ["mission", missionId],
    queryFn: () => fetchMission(missionId),
  })

  return { ...query }
}
