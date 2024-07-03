import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { ProfileApi } from "@/types/api/profile"
import routes from "@/web/routes"

export const useGetProfile = (id: string | null) => {
  return useQuery<ProfileApi>({
    queryKey: ["freelanceUpdateProfile", id],
    queryFn: () =>
      apiFetch({
        url: routes.api.freelance.getProfile(id),
      }),
  })
}
