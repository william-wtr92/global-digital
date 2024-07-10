"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryState } from "nuqs"
import { type ChangeEvent, useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { toast } from "sonner"

import { Input } from "@/components/ui/input"
import type { User } from "@/features/account/types/user"
import SearchDisplayEmployee from "@/features/companies/components/Habilitations/SearchDisplayEmployee"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

const SearchEmployee = () => {
  const [search, setSearch] = useQueryState("search", parseAsString)
  const { id } = useParams() as { id: string }
  const queryClient = useQueryClient()
  const t = useTranslations()

  const [focus, setFocus] = useState(false)
  const [employeesSuggestions, setEmployeesSuggestions] = useState<User[]>([])

  const searchEmployee = useMutation({
    mutationFn: async () => {
      const result = await apiFetch({
        url: routes.api.users.search,
        method: "POST",
        data: { searchText: search, id },
      })

      if (result.status !== 200) {
        toast.error(t("CompaniesId.error"))

        return
      }

      setEmployeesSuggestions(result.data)
      await queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
    onError: () => {
      toast.error(t("Form.UpdateProfilForm.deleteAccountError"))
    },
  })

  useEffect(() => {
    if (search) {
      searchEmployee.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFocus = () => {
    setFocus(!focus)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    searchEmployee.mutate()
  }

  return (
    <>
      <div
        className={`${employeesSuggestions.length && focus ? "shadow-xl" : ""} relative w-4/5 xl:w-1/2`}
      >
        <Input
          onFocus={handleFocus}
          onBlur={handleFocus}
          onChange={handleSearch}
          defaultValue={search || ""}
          className={`${employeesSuggestions.length > 0 && focus ? "rounded-t-l rounded-b-none border-b-0 shadow-none" : "rounded"} pl-8 focus-visible:outline-none focus-visible:ring-0`}
          type="search"
          placeholder={t("Companies.habilitation.placeholder")}
        />
        <CiSearch className="absolute left-2.5 top-2.5 h-4 text-muted-foreground" />
        <SearchDisplayEmployee
          employeesSuggestions={employeesSuggestions}
          focus={focus}
          setEmployeesSuggestions={setEmployeesSuggestions}
        />
      </div>
    </>
  )
}

export default SearchEmployee
