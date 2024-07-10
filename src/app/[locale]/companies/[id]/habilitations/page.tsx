"use client"

import { useTranslations } from "next-intl"

import EmployeeList from "@/features/companies/components/Habilitations/EmployeeList"
import SearchEmployee from "@/features/companies/components/Habilitations/SearchEmployee"
import { useAppContext } from "@/hooks/useAppContext"
import { useRouter } from "@/utils/navigation"
import routes from "@/utils/routes"

const CompaniesHabilitations = () => {
  const { userInfo } = useAppContext()
  const t = useTranslations()
  const router = useRouter()

  if (!userInfo.id) {
    router.push(routes.home)

    return
  }

  return (
    <div className="my-6 flex h-full flex-col items-center gap-6">
      <h1 className="w-2/3 text-center text-2xl font-bold text-blueText md:text-4xl">
        {t("Companies.habilitation.title")}
      </h1>

      <SearchEmployee />
      <EmployeeList />
    </div>
  )
}

export default CompaniesHabilitations
