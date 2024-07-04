"use client"

import {
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"

import Spinner from "@/components/customs/Utils/Spinner"
import { MissionOperating } from "@/types"
import { endDate, startDate } from "@/utils/date"
import { firstLetterUppercase } from "@/utils/string"
import { useMission } from "@/web/hooks/useMission"
import routes from "@/web/routes"

// eslint-disable-next-line complexity
const DetailMissionPage = () => {
  const router = useRouter()
  const t = useTranslations("Missions")

  const [id] = useQueryState("id")

  const { data, isLoading, isError } = useMission(id || "")

  const resultMission = !isLoading && !isError ? data?.detailedMission : null
  const detailedMission = resultMission?.Missions
  const detailedCompany = resultMission?.Company

  if (!id) {
    router.push(routes.missions.search)

    return null
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="relative flex h-[70vh] items-center justify-center px-6 py-10 xl:px-0">
      {detailedMission && data?.detailedMission.isEmployee && (
        <div className="absolute left-8 top-8">
          <Link href={routes.missions.updateMission(detailedMission.id)}>
            <PencilSquareIcon className="size-8 cursor-pointer" />
          </Link>
        </div>
      )}
      {detailedMission && detailedCompany && (
        <div className="flex flex-col gap-8">
          <h1 className="text-center text-4xl font-extrabold">
            {detailedMission.title}
          </h1>

          <div className="flex items-center justify-center gap-20">
            <div className="rounded-md border-2 px-6 py-4">
              <span>{detailedCompany.businessName[0].toUpperCase()}</span>
            </div>
            <div className="flex flex-col items-center gap-3 xl:flex-row">
              <span>{t("duration")}</span>
              <span className="font-semibold">
                {startDate(detailedMission)} {t("to")}{" "}
                {endDate(detailedMission)}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8">
            <div className="flex items-center justify-center gap-20">
              <div className="flex items-center gap-3 text-xl font-bold">
                <GlobeAltIcon className="size-6" />
                <span>{firstLetterUppercase(detailedMission.operating)}</span>
              </div>
              {detailedMission.operating !== MissionOperating.homeWorking && (
                <div className="flex items-center gap-3 text-xl font-bold">
                  <MapPinIcon className="size-6" />
                  <span>{detailedMission.localisation}</span>
                </div>
              )}
            </div>
            <p className="mx-auto w-full break-all text-center xl:w-1/2">
              {detailedMission.description}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailMissionPage
