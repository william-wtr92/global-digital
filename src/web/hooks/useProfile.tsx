"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { ProfileApi } from "@/types/api/profile"
import routes from "@/web/routes"

const fetchProfile = async (id: string) => {
  const response = await apiFetch({
    url: routes.api.freelance.getProfile(id),
  })

  return response.data
}

export const useFreelanceProfile = (id: string) => {
  const { ...query } = useQuery<ProfileApi>({
    queryKey: ["freelanceProfile"],
    queryFn: () => fetchProfile(id),
  })

  return query
}