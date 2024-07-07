import {
  useQuery as useTanStackQuery,
  type UndefinedInitialDataOptions,
} from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import { ApiError } from "@/utils/ApiError"
import { SC } from "@/utils/constants/status"

export const useQuery = <T>(
  url: string,
  options?: Omit<
    UndefinedInitialDataOptions<T, ApiError>,
    "queryKey" | "queryFn"
  >,
) =>
  useTanStackQuery<T, ApiError>({
    queryKey: [url],
    queryFn: async () => {
      const response = await apiFetch({ url })

      if (response.status !== SC.success.OK) {
        throw new ApiError(response)
      }

      return response.data
    },
    ...options,
  })
