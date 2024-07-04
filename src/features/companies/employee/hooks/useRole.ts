"use client"

import { useQuery } from "@tanstack/react-query"

import type { Role } from "@/features/companies/employee/types/role"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchRole = async () => {
  const response = await apiFetch({
    url: routes.api.roles.index,
  })

  return response.data
}

export const useRole = () =>
  useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: fetchRole,
  })
