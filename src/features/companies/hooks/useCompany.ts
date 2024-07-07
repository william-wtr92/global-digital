"use client"

import type { SelectCompany } from "@/db/schema"
import { useQuery } from "@/hooks/useQuery"
import routes from "@/utils/routes"

export const useCompany = (id: string) =>
  useQuery<SelectCompany>(routes.api.companies[":id"].index(id))
