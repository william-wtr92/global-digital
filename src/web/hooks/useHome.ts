"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import routes from "@/web/routes"

export type HomeResponse = {
  result: boolean
  total: {
    missionCount: number
    freelanceCount: number
    companyCount: number
  }
}

const fetchHome = async () => {
  const response = await apiFetch<HomeResponse>({
    url: routes.api.home,
  })

  return response.data
}

export const useHome = () => {
  const { ...query } = useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: fetchHome,
  })

  return query
}
