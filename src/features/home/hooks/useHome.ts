"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

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

export const useHome = () =>
  useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: fetchHome,
  })
