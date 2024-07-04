import { useQuery } from "@tanstack/react-query"

import type { SelectCandidate, SelectUser } from "@/db/schema"
import { apiFetch } from "@/lib/api"
import routes from "@/web/routes"

type Response = {
  result: boolean
  candidates: {
    Candidate: SelectCandidate
    Users: SelectUser
  }[]
}

const fetchCandidates = async (missionId: string) => {
  const response = await apiFetch<Response>({
    url: routes.api.missions.candidate.list(missionId),
    method: "GET",
    credentials: "include",
  })

  return response.data
}

export const useCandidates = (missionId: string) =>
  useQuery<Response>({
    queryKey: ["candidates", missionId],
    queryFn: () => fetchCandidates(missionId),
  })
