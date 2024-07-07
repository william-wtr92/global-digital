"use client"

import type { Role } from "@/features/companies/employee/types/role"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

export const useRole = () => useQuery<Role>(routes.api.roles.index)
