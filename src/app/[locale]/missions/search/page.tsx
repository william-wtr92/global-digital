"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MissionsList from "@/features/missions/components/MissionsList"
import {
  searchMissionsSchema,
  type SearchMissionsType,
} from "@/features/missions/types/missions"

const SearchPage = () => {
  const t = useTranslations("Missions")

  const [searchQuery, setSearchQuery] = useState<string>("")

  const form = useForm<SearchMissionsType>({
    mode: "onChange",
    resolver: zodResolver(searchMissionsSchema),
    defaultValues: {
      search: "",
    },
  })

  const onSubmit = (data: SearchMissionsType) => {
    setSearchQuery(data.search || "")
  }

  return (
    <div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-text-large-screen flex flex-col items-center space-y-8 rounded-md bg-white p-6"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-4/5 xl:w-1/2">
                  <FormLabel className="relative left-1 font-bold text-neutral-800">
                    {t("form.search.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:outline-accent-500 mt-2 px-4 py-2 focus-visible:border-0 focus-visible:ring-0"
                      type="text"
                      placeholder={t("form.search.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="relative left-2 text-destructive" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="flex h-[80vh] justify-center px-2 py-1 xl:px-0">
        <MissionsList searchQuery={searchQuery} />
      </div>
    </div>
  )
}

export default SearchPage
