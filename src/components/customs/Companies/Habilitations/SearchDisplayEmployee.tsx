"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"
import type { User } from "@/types/user"
import routes from "@/web/routes"

type SearchDisplayEmployeeProps = {
  employeesSuggestions: User[]
  focus: boolean
  setEmployeesSuggestions: Dispatch<SetStateAction<User[]>>
}

const SearchDisplayEmployee = ({
  employeesSuggestions,
  focus,
  setEmployeesSuggestions,
}: SearchDisplayEmployeeProps) => {
  const { id } = useParams() as { id: string }
  const t = useTranslations()
  const queryClient = useQueryClient()

  const addEmployee = useMutation({
    mutationFn: async (userId: string) => {
      const result = await apiFetch({
        url: routes.api.companies.addEmployee(id),
        method: "POST",
        data: { userId },
      })

      if (result.status !== 200) {
        toast.error(t("CompaniesId.error"))

        return
      }

      setEmployeesSuggestions([])
      await queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
    onError: () => {
      toast.error(t("Form.UpdateProfilForm.deleteAccountError"))
    },
  })

  const handleAddEmployee = (userId: string) => {
    addEmployee.mutate(userId)
  }

  return (
    <>
      <div
        className={`${focus ? "flex" : "hidden"} flex-col gap-2 border border-t-0 p-2`}
      >
        {employeesSuggestions.length === 0 && focus && (
          <>{t("Companies.habilitation.noResult")}</>
        )}
        {employeesSuggestions.length > 0 && focus && (
          <>
            <span className="px-2 pt-2 text-sm font-bold">
              {t("Companies.habilitation.suggestions")}
            </span>
            {employeesSuggestions.map((item) => (
              <Button
                variant="ghostNoHover"
                size="none"
                key={item.id}
                onMouseDown={() => handleAddEmployee(item.id)}
                className="text-md hover:bg-skyBlue cursor-pointer justify-start rounded px-2 py-1"
              >
                {item.firstName}
              </Button>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default SearchDisplayEmployee
