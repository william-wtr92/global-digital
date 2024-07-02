import Link from "next/link"
import { useTranslations } from "next-intl"

import routes from "@/web/routes"

const RegistrationPage = () => {
  const t = useTranslations("Registration")

  return (
    <div className="flex h-full flex-col items-center justify-center gap-20">
      <h1 className="text-4xl font-extrabold">{t("hello")}</h1>
      <h2 className="text-3xl font-bold">{t("whoAreYou")}</h2>

      <div className="flex flex-col gap-20 md:flex-row">
        <Link
          href={routes.freelanceCreateProfile}
          className="bg-gray-200 p-16 font-semibold uppercase"
        >
          {t("freeLance")}
        </Link>
        <Link href={"/"} className="bg-gray-200 p-16 font-semibold uppercase">
          {t("recruiter")}
        </Link>
      </div>
    </div>
  )
}

export default RegistrationPage
