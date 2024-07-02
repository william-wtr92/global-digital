"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import { RxPerson } from "react-icons/rx"

import { Button } from "@/components/ui/button"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"

const Navbar = () => {
  const { userInfo } = useAppContext()
  const t = useTranslations("Navbar")

  const handleLogout = () => {
    // Logout logic
  }

  return (
    <div className="flex items-center justify-between bg-gray-300 p-3">
      <Link href={routes.home}>Logo</Link>

      {userInfo.id ? (
        <div className="flex items-center gap-10">
          <RxPerson className="text-3xl" />
          <Button
            onClick={handleLogout}
            className="text-md rounded-full bg-slate-400 px-4 py-1 font-normal"
            variant="ghostNoHover"
            size="none"
          >
            {t("logout")}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href={routes.registration}>{t("signup")}</Link>
          <Link
            href={routes.home}
            className="rounded-full bg-slate-400 px-4 py-1"
          >
            {t("login")}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
