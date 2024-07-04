"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { Loading } from "@/components/customs/layout/Loading"
import EmployeeList from "@/features/companies/components/Habilitations/EmployeeList"
import SearchEmployee from "@/features/companies/components/Habilitations/SearchEmployee"
import { useEmployees } from "@/features/companies/employee/hooks/useEmployee"
import { useAppContext } from "@/hooks/useAppContext"
import { useRouter } from "@/utils/navigation"
import routes from "@/utils/routes"

const Habilitations = () => {
  const { id } = useParams() as { id: string }
  const { userInfo } = useAppContext()
  const t = useTranslations()
  const router = useRouter()
  const { data, isPending, error } = useEmployees(id)

  if (!userInfo) {
    return null
  }

  if (isPending) {
    return <Loading />
  }

  if (error) {
    toast.error(t("Error.anErrorOccurred"))
    router.push(routes.home)

    return
  }

  return (
    <div className="my-6 flex h-full flex-col items-center gap-6">
      <h1 className="w-2/3 text-center text-2xl font-bold text-blueText md:text-4xl">
        {t("Companies.habilitation.title")}
      </h1>

      <SearchEmployee />
      <EmployeeList employees={data.employees} />
    </div>
  )
}

export default Habilitations
