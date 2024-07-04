"use client"

import { useQuery } from "@tanstack/react-query"

import type { SelectCompany, SelectMission } from "@/db/schema"
import { apiFetch } from "@/lib/api"
import routes from "@/web/routes"

type Response = {
  result: boolean
  searchResults: {
    Missions: SelectMission
    Company: SelectCompany
  }[]
}

const fetchMissions = async () => {
  const response = await apiFetch<Response>({
    url: routes.api.missions.list,
    method: "GET",
    credentials: "include",
  })

  return response.data
}

export const useMissions = () =>
  useQuery<Response>({
    queryKey: ["missions"],
    queryFn: () => fetchMissions(),
  })
