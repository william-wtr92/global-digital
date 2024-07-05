"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useFormatter, useTranslations } from "next-intl"
import { BsPersonGear } from "react-icons/bs"

import { Loading } from "@/components/layout/Loading"
import { useArea } from "@/features/areas/hooks/useArea"
import { useCompany } from "@/features/companies/hooks/useCompany"
import { useCompanyMissions } from "@/features/companies/missions/hooks/useCompanyMissions"
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
  } = useCompany(id)
  const { data: areaResult, isLoading: isLoadingArea } = useArea(
    companyResult?.areaId as string,
  )
  const { data: missionsResult, isLoading: isLoadingMissions } =
    useCompanyMissions(id, { isSuccess })

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
          src={companyResult!.logo}
          alt={`Logo of the company ${companyResult!.businessName}`}
          width={360}
          height={360}
          className="rounded-md"
        />
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold">{companyResult?.businessName}</h1>
          <h2>{companyResult?.headQuarter}</h2>
          <h3>{firstLetterUppercase(areaResult!.value)}</h3>
        </div>
      </div>
      <p className="text-xl">{companyResult?.description}</p>
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-5xl font-bold">
          {t("CompaniesId.availablesMissions")}
        </h1>
        <div className="flex flex-col">
          {missionsResult?.map((mission) => (
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
