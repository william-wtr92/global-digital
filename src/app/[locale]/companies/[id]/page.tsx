"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useParams } from "next/navigation"

import type { SelectArea, SelectCompany } from "@/db/schema"
import { apiFetch, type ApiResponse } from "@/lib/api"
import routes from "@/web/routes"

const CompaniesIdPage = () => {
  const { id } = useParams()
  const { data: companyResult } = useQuery<ApiResponse<SelectCompany>>({
    queryKey: [routes.companies[":id"](id as string)],
    queryFn: () =>
      apiFetch({
        url: routes.api.companies[":id"](id as string),
      }),
  })

  const { data: areaResult } = useQuery<ApiResponse<SelectArea>>({
    queryKey: [routes.api.areas[":id"](companyResult?.data.areaId)],
    queryFn: () =>
      apiFetch({
        url: routes.api.areas[":id"](companyResult?.data.areaId),
      }),
  })

  return (
    <div className="mt-6 flex flex-col items-center gap-5">
      <div className="grid grid-cols-2">
        <Image
          src={companyResult?.data.logo}
          alt={`Logo of the company ${companyResult?.data.businessName}`}
          width={640}
          height={480}
        />
        <div className="flex flex-col items-center gap-3">
          <h1>{companyResult?.data.businessName}</h1>
          <h2>{companyResult?.data.headQuarter}</h2>
          <h3>{areaResult?.data.value}</h3>
        </div>
      </div>
    </div>
  )
}

export default CompaniesIdPage
