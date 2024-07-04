"use client"

import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import EmployeeList from "@/components/customs/Companies/Habilitations/EmployeeList"
import SearchEmployee from "@/components/customs/Companies/Habilitations/SearchEmployee"
import Spinner from "@/components/customs/Utils/Spinner"
import { useRouter } from "@/navigation"
import useAppContext from "@/web/hooks/useAppContext"
import { useEmployees } from "@/web/hooks/useEmployee"
import routes from "@/web/routes"

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
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error) {
    toast.error(t("Error.anErrorOccurred"))
    router.push(routes.home)

    return
  }

  return (
    <div className="my-6 flex h-full flex-col items-center gap-6">
      <h1 className="text-blueText w-2/3 text-center text-2xl font-bold md:text-4xl">
        {t("Companies.habilitation.title")}
      </h1>

      <SearchEmployee />
      <EmployeeList employees={data.employees} />
    </div>
  )
}

export default Habilitations
