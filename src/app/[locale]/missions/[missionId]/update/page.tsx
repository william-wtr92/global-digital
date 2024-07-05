"use client"

import { useMutation } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { RoughNotation } from "react-rough-notation"
import { toast } from "sonner"

import MissionForm from "@/features/missions/components/MissionForm"
import { useMission } from "@/features/missions/hooks/useMission"
import type {
  MissionOperatingType,
  MissionType,
} from "@/features/missions/types/missions"
import { apiFetch } from "@/lib/api"
import { SC } from "@/utils/constants/status"
import routes from "@/utils/routes"

const UpdateMissionPage = () => {
  const t = useTranslations("Missions")
  const router = useRouter()
  const { missionId } = useParams<{ missionId: string }>()
  const { data, isLoading, isError } = useMission(missionId)
  const resultMission =
    !isLoading && !isError ? data?.detailedMission.Missions : null

  const validOperating = (
    value: string | undefined,
  ): value is MissionOperatingType => {
    return value === "remote" || value === "site" || value === "hybrid"
  }
  const reformatMission: Partial<MissionType> = {
    title: resultMission?.title,
    description: resultMission?.description,
    startDate: resultMission?.startDate,
    endDate: resultMission?.endDate,
    operating: validOperating(resultMission?.operating)
      ? resultMission.operating
      : undefined,
    localisation: resultMission?.localisation,
    price: resultMission?.price,
  }

  const mutation = useMutation({
    mutationFn: async (data: MissionType) => {
      const response = await apiFetch({
        url: routes.api.missions.updateMission(missionId),
        method: "PATCH",
        data,
        credentials: "include",
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("form.update.error"))

        return
      }

      toast.success(t("form.update.success"))
      router.push(routes.missions.detailedMission(missionId))
    },
  })

  const handleSubmit = (data: MissionType) => {
    mutation.mutate(data)
  }

  if (!data?.detailedMission.isEmployee) {
    router.push(routes.missions.search)

    return null
  }

  return (
    <div className="mt-14 flex h-full flex-col items-center justify-center gap-3 xl:mt-6">
      <RoughNotation type="underline" color="#000000" show={true} padding={10}>
        <h1 className="mt-4 text-2xl font-extrabold xl:text-4xl">
          {t("updateTitle")}
        </h1>
      </RoughNotation>
      <MissionForm
        defaultValues={reformatMission}
        onSubmit={handleSubmit}
        submitText={t("form.update.submit")}
      />
    </div>
  )
}

export default UpdateMissionPage
