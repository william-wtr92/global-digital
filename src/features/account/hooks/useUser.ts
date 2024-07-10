"use client"

import type { SelectUser } from "@/db/schema"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

type Response = {
  result: true
  userConnected: Omit<SelectUser, "passwordHash" | "passwordSalt">
}

export const useUser = (token: string | undefined) =>
  useQuery<Response>(routes.api.auth.user, {
    enabled: !!token,
  })
