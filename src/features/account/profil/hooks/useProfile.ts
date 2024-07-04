"use client"

import { useQuery } from "@tanstack/react-query"

import type { Profile } from "@/features/freelance/types/freelance"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchProfile = async (id: string) => {
  const response = await apiFetch({
    url: routes.api.freelance.getProfile(id),
  })

  return response.data
}

export const useProfile = (id: string) =>
  useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(id),
  })
