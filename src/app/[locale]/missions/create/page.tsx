"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { RoughNotation } from "react-rough-notation"
import { toast } from "sonner"

import MissionForm from "@/features/missions/components/MissionForm"
import type { MissionType } from "@/features/missions/types/missions"
import { apiFetch } from "@/lib/api"
import type { ApiError } from "@/utils/ApiError"
import { SC } from "@/utils/constants/status"
import routes from "@/utils/routes"

const CreateMissionPage = () => {
  const t = useTranslations("Missions")
  const router = useRouter()

  const mutation = useMutation<void, ApiError, MissionType>({
    mutationFn: async (data) => {
      const response = await apiFetch({
        url: routes.api.missions.create,
        method: "POST",
        data,
      })

      if (response.status !== SC.success.CREATED) {
        toast.error(t("form.create.error"))

        return
      }

      toast.success(t("form.create.success"))
      router.push(routes.missions.search)
    },
  })

  const handleSubmit = (data: MissionType) => {
    mutation.mutate(data)
  }

  return (
    <div className="mt-14 flex h-full flex-col items-center justify-center gap-3 xl:mt-6">
      <RoughNotation type="underline" color="#000000" show={true} padding={10}>
        <h1 className="mt-4 text-2xl font-extrabold xl:text-4xl">
          {t("createTitle")}
        </h1>
      </RoughNotation>
      <MissionForm
        onSubmit={handleSubmit}
        submitText={t("form.create.submit")}
      />
    </div>
  )
}

export default CreateMissionPage
