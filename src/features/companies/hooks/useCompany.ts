"use client"

import { useQuery } from "@tanstack/react-query"

import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const fetchCompany = async (id: string) => {
  const response = await apiFetch({
    url: routes.api.companies[":id"].index(id),
  })

  return response.data
}

export const useCompany = (id: string) =>
  useQuery({
    queryKey: ["company", id],
    queryFn: () => fetchCompany(id),
  })
