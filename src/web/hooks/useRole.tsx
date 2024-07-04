"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { Role } from "@/types/role"
import routes from "@/web/routes"

const fetchRole = async () => {
  const response = await apiFetch({
    url: routes.api.roles.index,
  })

  return response.data
}

export const useRole = () => {
  const { ...query } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: fetchRole,
  })

  return query
}
