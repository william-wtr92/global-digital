"use client"

import type { ApiProfile } from "@/features/account/profil/types/api/profile"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

export const useProfile = (id: string) =>
  useQuery<ApiProfile>(routes.api.getProfile(id))
