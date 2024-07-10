"use client"

import type { Area } from "@/features/areas/types/area"
import { useQuery } from "@/hooks/useQuery"
import type { OmitQueryFnAndKey } from "@/types/utils"
import routes from "@/utils/routes"

export const useArea = (id: string, options?: OmitQueryFnAndKey<Area>) =>
  useQuery(routes.api.areas[":id"](id), options)
