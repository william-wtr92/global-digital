"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import Habilitations from "@/components/customs/Companies/Habilitations/Habilitations"
import Spinner from "@/components/customs/Utils/Spinner"
import { useRouter } from "@/navigation"
import useAppContext from "@/web/hooks/useAppContext"
import { useCompany } from "@/web/hooks/useCompany"
import routes from "@/web/routes"

const CompaniesHabilitations = () => {
  const { id } = useParams() as { id: string }
  const { userInfo } = useAppContext()
  const t = useTranslations()
  const router = useRouter()
  const { data, isPending, error } = useCompany(id)

  if (!userInfo.id) {
    router.push(routes.home)

    return
  }

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error || data.error) {
    toast.error(t("Error.anErrorOccurred"))
    router.push(routes.home)

    return
  }

  return <Habilitations />
}

export default CompaniesHabilitations
