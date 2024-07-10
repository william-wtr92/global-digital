import type { UndefinedInitialDataOptions } from "@tanstack/react-query"

import type { ApiError } from "@/utils/ApiError"

export type ReadonlyArrayZod = readonly [string, ...string[]]

export type OmitQueryFnAndKey<T> = Omit<
  UndefinedInitialDataOptions<T, ApiError>,
  "queryKey" | "queryFn"
>
