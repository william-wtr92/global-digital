"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { CiSearch } from "react-icons/ci"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import routes from "@/web/routes"

const SearchInput = () => {
  const router = useRouter()
  const t = useTranslations()

  return (
    <Button
      onClick={() => router.push(routes.missions.search)}
      variant="ghostNoHover"
      size="none"
      className="relative mx-3 mt-14 w-72 cursor-pointer md:w-96"
    >
      <Input
        title={t("Home.search.placeholder")}
        type="search"
        placeholder={t("Home.search.placeholder")}
        className="bg-skyBlue cursor-pointer rounded-full p-6 text-xs focus-visible:outline-none focus-visible:ring-0 md:text-sm"
      />
      <CiSearch className="absolute right-2.5 top-4 h-4" />
    </Button>
  )
}

export default SearchInput
