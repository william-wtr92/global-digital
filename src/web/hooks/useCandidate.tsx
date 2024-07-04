import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import routes from "@/web/routes"

type Response = {
  result: boolean
  isUserAlreadyCandidate: boolean
}

const fetchCandidate = async (missionId: string) => {
  const response = await apiFetch<Response>({
    url: routes.api.missions.candidate.isCandidate(missionId),
    method: "GET",
    credentials: "include",
  })

  return response.data
}

export const useCandidate = (missionId: string) => {
  const { ...query } = useQuery<Response>({
    queryKey: ["candidate", missionId],
    queryFn: () => fetchCandidate(missionId),
  })

  return { ...query }
}
