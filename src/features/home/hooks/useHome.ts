"use client"

import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

export type HomeResponse = {
  result: boolean
  total: {
    missionCount: number
    freelanceCount: number
    companyCount: number
  }
}

export const useHome = () => useQuery<HomeResponse>(routes.api.home)
