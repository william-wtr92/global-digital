import { useQuery as useTanStackQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { OmitQueryFnAndKey } from "@/types/utils"
import { ApiError } from "@/utils/ApiError"
import { SC } from "@/utils/constants/status"

export const useQuery = <T>(url: string, options?: OmitQueryFnAndKey<T>) =>
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
