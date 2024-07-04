"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import Spinner from "@/components/customs/Utils/Spinner"
import type { SelectArea, SelectCompany } from "@/db/schema"
import { SC } from "@/def/status"
import { apiFetch, type ApiResponse } from "@/lib/api"
import { capitalizeFirstLetter } from "@/utils/forms"
import routes from "@/web/routes"

const CompaniesIdPage = () => {
  const t = useTranslations("CompaniesId")
  const { id } = useParams()
  const {
    data: companyResult,
    isSuccess,
    isLoading: isLoadingCompany,
  } = useQuery<ApiResponse<SelectCompany>>({
    queryKey: [routes.api.companies[":id"](id as string)],
    queryFn: async () => {
      const response = await apiFetch({
        url: routes.api.companies[":id"](id as string),
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("Form.error"))
      }

      return response
    },
  })

  const { data: areaResult, isLoading: isLoadingArea } = useQuery<
    ApiResponse<SelectArea>
  >({
    enabled: isSuccess,
    queryKey: [routes.api.areas[":id"](companyResult?.data.areaId as string)],
    queryFn: async () => {
      const response = await apiFetch({
        url: routes.api.areas[":id"](companyResult?.data.areaId as string),
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("Form.error"))
      }

      return response
    },
  })

  if (isLoadingCompany || isLoadingArea) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-5">
      <div className="flex items-center justify-center gap-5">
        <Image
          src={companyResult!.data.logo}
          alt={`Logo of the company ${companyResult!.data.businessName}`}
          width={360}
          height={360}
          className="rounded-md"
        />
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold">
            {companyResult?.data.businessName}
          </h1>
          <h2>{companyResult?.data.headQuarter}</h2>
          <h3>{capitalizeFirstLetter(areaResult!.data.value)}</h3>
        </div>
      </div>
      <p className="text-xl">{companyResult?.data.description}</p>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Missions disponibles</h1>
      </div>
    </div>
  )
}

export default CompaniesIdPage
