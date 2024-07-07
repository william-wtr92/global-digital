"use client"

import type { UndefinedInitialDataOptions } from "@tanstack/react-query"

import type { SelectMission } from "@/db/schema"
import { useQuery } from "@/hooks/useQuery"
import type { ApiError } from "@/utils/ApiError"
import routes from "@/utils/routes"

export const useCompanyMissions = (
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<SelectMission[], ApiError>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<SelectMission[]>(routes.api.companies[":id"].missions(id), options)
