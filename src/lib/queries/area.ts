import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import type { Area } from "@/types/area"
import routes from "@/web/routes"

export const useGetAreas = () => {
  return useQuery<Area[]>({
    queryKey: ["moreAboutFreelance"],
    queryFn: async () =>
      await apiFetch({
        url: routes.api.areas,
      }),
  })
}
