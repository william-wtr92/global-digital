"use client"

import { useQuery } from "@tanstack/react-query"

import type { SelectUser } from "@/db/schema"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

type Response = {
  result: true
  userConnected: Omit<SelectUser, "passwordHash" | "passwordSalt">
}

const fetchUser = async () => {
  const response = await apiFetch<
    Omit<SelectUser, "passwordHash" | "passwordSalt">
  >({
    url: routes.api.auth.user,
    method: "GET",
    credentials: "include",
  })

  return response.data
}

export const useUser = (token: string | undefined) =>
  useQuery<Response>({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!token,
  })
