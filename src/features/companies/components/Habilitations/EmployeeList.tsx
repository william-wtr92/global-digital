"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { RxPerson } from "react-icons/rx"
import { toast } from "sonner"

import { AnErrorOccurred } from "@/components/layout/errors/AnErrorOccurred"
import { Loading } from "@/components/layout/Loading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DeleteEmployeeDialog from "@/features/companies/components/Habilitations/DeleteEmployeeDialog"
import { useCompanyEmployees } from "@/features/companies/employees/hooks/useCompanyEmployees"
import { useRoles } from "@/features/roles/hooks/useRoles"
import { useAppContext } from "@/hooks/useAppContext"
import { apiFetch } from "@/lib/api"
import { getFullName } from "@/utils/functions"
import routes from "@/utils/routes"

const EmployeeList = () => {
  const { id } = useParams<{ id: string }>()
  const { userInfo } = useAppContext()
  const t = useTranslations()
  const {
    data: dataRoles,
    isPending: isPendingRoles,
    isError: isErrorRoles,
  } = useRoles()
  const {
    data: dataEmployees,
    isPending: isPendingEmployees,
    isError: isErrorEmployees,
  } = useCompanyEmployees(id)
  const queryClient = useQueryClient()

  const updateHabilitation = useMutation({
    mutationFn: async ({
      roleId,
      employeeId,
    }: {
      roleId: string
      employeeId: string
    }) => {
      const result = await apiFetch({
        url: routes.api.companies.updateHabilitation(id, employeeId),
        method: "PATCH",
        data: { roleId },
      })

      if (result.status !== 200) {
        toast.error(t("Companies.habilitation.updateHabilitationError"))

        return
      }

      toast.success(t("Companies.habilitation.updateHabilitationSuccess"))
      await queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
    onError: () => {
      toast.error(t("Form.UpdateProfilForm.deleteAccountError"))
    },
  })

  if (isPendingRoles || isPendingEmployees) {
    return <Loading />
  }

  if (isErrorRoles || isErrorEmployees) {
    return <AnErrorOccurred />
  }

  const handleChangeHabilitation = (roleId: string, employeeId: string) => {
    updateHabilitation.mutate({ roleId, employeeId })
  }

  return (
    <>
      {dataEmployees?.map((item) => (
        <div key={item.Employee.id} className="flex items-center gap-4">
          <Avatar className="h-14 w-14 md:h-32 md:w-32">
            <AvatarImage src={item.Users.avatarUrl} alt="User Avatar" />
            <AvatarFallback>
              <RxPerson className="text-3xl md:text-6xl" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col justify-center gap-1">
            <span className="text-sm font-bold">{getFullName(item.Users)}</span>
            <Select
              onValueChange={(value) =>
                handleChangeHabilitation(value, item.Employee.id)
              }
              defaultValue={item.Role.id}
              disabled={userInfo.id === item.Employee.userId}
            >
              <SelectTrigger className="w-[180px] border">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataRoles?.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {t(`Global.${role.value}`)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DeleteEmployeeDialog employee={item.Employee} />
        </div>
      ))}
    </>
  )
}

export default EmployeeList
