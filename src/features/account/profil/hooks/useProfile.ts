"use client"

import { useQuery } from "@tanstack/react-query"

import type { ApiProfile } from "@/features/account/profil/types/api/profile"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchProfile = async (id: string) => {
  const response = await apiFetch({
    url: routes.api.getProfile(id),
  })

  return response.data
}

export const useProfile = (id: string) =>
  useQuery<ApiProfile>({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(id),
  })
