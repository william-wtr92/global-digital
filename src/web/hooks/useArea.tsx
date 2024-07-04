"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { Area } from "@/types/area"
import routes from "@/web/routes"

const fetchArea = async () => {
  const response = await apiFetch({
    url: routes.api.areas.index,
  })

  return response.data
}

export const useArea = () => {
  const { ...query } = useQuery<Area[]>({
    queryKey: ["areaMoreAboutFreelance"],
    queryFn: fetchArea,
  })

  return query
}
