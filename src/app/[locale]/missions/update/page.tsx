"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { RoughNotation } from "react-rough-notation"
import { toast } from "sonner"

import MissionForm from "@/components/customs/Forms/Missions/MissionForm"
import { SC } from "@/def/status"
import { apiFetch } from "@/lib/api"
import type { MissionOperatingType, MissionType } from "@/types"
import { useMission } from "@/web/hooks/useMission"
import routes from "@/web/routes"

const UpdateMissionPage = () => {
  const t = useTranslations("Missions")
  const router = useRouter()

  const [id] = useQueryState("id")

  const { data, isLoading, isError } = useMission(id || "")
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
  }

  const mutation = useMutation({
    mutationFn: async (data: MissionType) => {
      const response = await apiFetch({
        url: routes.api.missions.updateMission(id!),
        method: "PATCH",
        data,
        credentials: "include",
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("form.update.error"))

        return
      }

      toast.success(t("form.update.success"))
      router.push(routes.missions.detailedMission(id!))
    },
  })

  const handleSubmit = (data: MissionType) => {
    mutation.mutate(data)
  }

  if (!id || !data?.detailedMission.isEmployee) {
    router.push(routes.missions.search)

    return null
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
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
