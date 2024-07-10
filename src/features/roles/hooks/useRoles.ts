"use client"

import type { Role } from "@/features/roles/types/role"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

export const useRoles = () => useQuery<Role[]>(routes.api.roles.index)
