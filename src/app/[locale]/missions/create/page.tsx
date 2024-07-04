"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { RoughNotation } from "react-rough-notation"
import { toast } from "sonner"

import MissionForm from "@/components/customs/Forms/Missions/MissionForm"
import { SC } from "@/def/status"
import { apiFetch } from "@/lib/api"
import type { MissionType } from "@/types"
import routes from "@/web/routes"

const CreateMissionPage = () => {
  const t = useTranslations("Missions")
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (data: MissionType) => {
      const response = await apiFetch({
        url: routes.api.missions.create,
        method: "POST",
        data,
        credentials: "include",
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
    <div className="flex h-full flex-col items-center justify-center gap-3">
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
