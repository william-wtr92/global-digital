"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Loading } from "@/components/layout/Loading"
import Habilitations from "@/features/companies/components/Habilitations/Habilitations"
import { useCompany } from "@/features/companies/hooks/useCompany"
import { useAppContext } from "@/hooks/useAppContext"
import { useRouter } from "@/utils/navigation"
import routes from "@/utils/routes"

const CompaniesHabilitations = () => {
  const { id } = useParams<{ id: string }>()
  const { userInfo } = useAppContext()
  const t = useTranslations()
  const router = useRouter()
  const { data, isPending, error } = useCompany(id)

  if (!userInfo.id) {
    router.push(routes.home)

    return
  }

  if (isPending) {
    return <Loading />
  }

  if (error || data.error) {
    toast.error(t("Error.anErrorOccurred"))
    router.push(routes.home)

    return
  }

  return <Habilitations />
}

export default CompaniesHabilitations
