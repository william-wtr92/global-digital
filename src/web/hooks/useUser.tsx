"use client"

import { useQuery } from "@tanstack/react-query"

import type { SelectUser } from "@/db/schema"
import { apiFetch } from "@/lib/api"
import routes from "@/web/routes"

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

export const useUser = () => {
  const { ...query } = useQuery<Response>({
    queryKey: ["user"],
    queryFn: fetchUser,
  })

  return query
}
