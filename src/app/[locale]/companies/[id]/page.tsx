"use client"

import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useFormatter, useTranslations } from "next-intl"
import { BsPersonGear } from "react-icons/bs"
import { toast } from "sonner"

import { Loading } from "@/components/customs/layout/Loading"
import type { SelectArea, SelectCompany, SelectMission } from "@/db/schema"
import { apiFetch, type ApiResponse } from "@/lib/api"
import { SC } from "@/utils/constants/status"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

const CompaniesIdPage = () => {
  const t = useTranslations()
  const formatter = useFormatter()
  const { id } = useParams<{ id: string }>()
  const {
    data: companyResult,
    isSuccess,
    isLoading: isLoadingCompany,
  } = useQuery<ApiResponse<SelectCompany>>({
    queryKey: [routes.api.companies[":id"].index(id)],
    queryFn: async () => {
      const response = await apiFetch({
        url: routes.api.companies[":id"].index(id),
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("error"))
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
        toast.error(t("error"))
      }

      return response
    },
  })

  const { data: missionsResult, isLoading: isLoadingMissions } = useQuery<
    ApiResponse<SelectMission[]>
  >({
    enabled: isSuccess,
    queryKey: [routes.api.companies[":id"].missions(id)],
    queryFn: async () => {
      const response = await apiFetch({
        url: routes.api.companies[":id"].missions(id),
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("error"))
      }

      return response
    },
  })

  if (isLoadingCompany || isLoadingArea || isLoadingMissions) {
    return <Loading />
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-5">
      <div className="flex items-center justify-center gap-5">
        <Link href={routes.companies[":id"].habilitations(id)}>
          <BsPersonGear className="text-5xl" />
        </Link>
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
          <h3>{firstLetterUppercase(areaResult!.data.value)}</h3>
        </div>
      </div>
      <p className="text-xl">{companyResult?.data.description}</p>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-bold">
          {t("CompaniesId.availablesMissions")}
        </h1>
        <div className="flex flex-col">
          {missionsResult?.data.map((mission) => (
            <div className="flex flex-col" key={mission.id}>
              <h2>
                <span className="text-2xl font-bold">{mission.title}</span> -{" "}
                <span className="text-xl">
                  {formatter.dateTime(new Date(mission.startDate), {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  {t("Missions.to")}{" "}
                  {formatter.dateTime(new Date(mission.endDate), {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </h2>
              <p>{mission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompaniesIdPage
