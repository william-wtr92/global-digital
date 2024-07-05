"use client"

import { useQuery } from "@tanstack/react-query"

import type { SelectMission } from "@/db/schema"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchCompanyMissions = async (id: string) => {
  const response = await apiFetch({
    url: routes.api.companies[":id"].missions(id),
  })

  return response.data
}

export const useCompanyMissions = (
  id: string,
  options?: { isSuccess: boolean },
) =>
  useQuery<SelectMission[]>({
    queryKey: [routes.api.companies[":id"].missions(id)],
    queryFn: () => fetchCompanyMissions(id),
    ...options,
  })
