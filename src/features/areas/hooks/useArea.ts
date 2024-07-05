"use client"

import { useQuery } from "@tanstack/react-query"

import type { Area } from "@/features/areas/types/area"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchArea = async (id: string) => {
  const response = await apiFetch({
    url: routes.api.areas[":id"](id),
  })

  return response.data
}

export const useArea = (id: string) =>
  useQuery<Area>({
    queryKey: [routes.api.areas[":id"](id)],
    queryFn: () => fetchArea(id),
  })
