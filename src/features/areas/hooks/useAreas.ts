"use client"

import { useQuery } from "@tanstack/react-query"

import type { Area } from "@/features/areas/types/area"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchArea = async () => {
  const response = await apiFetch({
    url: routes.api.areas.index,
  })

  return response.data
}

export const useAreas = () =>
  useQuery<Area[]>({
    queryKey: [routes.api.areas.index],
    queryFn: fetchArea,
  })
