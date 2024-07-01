import Link from "next/link"
import { useTranslations } from "next-intl"

import routes from "@/web/routes"

const Navbar = () => {
  const t = useTranslations("Navbar")

  return (
    <div className="flex items-center justify-between bg-gray-300 p-3">
      <Link href={routes.home()}>Logo</Link>
      <div className="flex items-center gap-4">
        <Link href={routes.home()}>{t("signup")}</Link>
        <Link
          href={routes.home()}
          className="rounded-full bg-slate-400 px-4 py-1"
        >
          {t("login")}
        </Link>
      </div>
    </div>
  )
}

export default Navbar
