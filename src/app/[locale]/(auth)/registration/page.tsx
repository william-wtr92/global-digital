import { useTranslations } from "next-intl"

import { Link } from "@/utils/navigation"
import routes from "@/utils/routes"

const RegistrationPage = () => {
  const t = useTranslations("Registration")

  return (
    <div className="flex h-full flex-col items-center justify-center gap-20 py-10">
      <h1 className="text-4xl font-extrabold text-blueText">{t("hello")}</h1>
      <h2 className="text-3xl font-bold text-blueText">{t("whoAreYou")}</h2>

      <div className="flex flex-col gap-20 md:flex-row">
        <Link
          href={routes.register.freelance}
          className="bg-skyBlue p-16 font-semibold uppercase"
        >
          {t("freeLance")}
        </Link>
        <Link
          href={routes.register.recruiter}
          className="bg-skyBlue p-16 font-semibold uppercase"
        >
          {t("recruiter")}
        </Link>
      </div>
    </div>
  )
}

export default RegistrationPage
