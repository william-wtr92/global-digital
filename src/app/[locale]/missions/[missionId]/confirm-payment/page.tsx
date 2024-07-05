"use client"

import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { RoughNotation } from "react-rough-notation"

import { useProfile } from "@/features/account/profil/hooks/useProfile"

const ConfirmPaymentPage = () => {
  const t = useTranslations("Missions")
  const [id] = useQueryState("id")
  const { data, isLoading, isError } = useProfile(id!)

  const resultProfile = !isLoading && !isError ? data?.Users : null
  const resultFreelance = !isLoading && !isError ? data?.Freelance : null

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <RoughNotation type="underline" color="#000000" show={true} padding={10}>
        <h1 className="text-3xl font-extrabold xl:text-4xl">
          {t("ConfirmPayment.title")}
        </h1>
      </RoughNotation>
      <div className="mt-10 flex items-center gap-10">
        <div className="rounded-md border-2 px-6 py-4">
          <span>{data?.businessName[0].toUpperCase()}</span>
        </div>
        <h2 className="text-2xl font-semibold">
          {data?.firstName} {data?.lastName}
        </h2>
      </div>
      <span>
        {t("ConfirmPayment.description", {
          name: `${data?.firstName} ${data?.lastName}`,
        })}
      </span>
      <span>{t("ConfirmPayment.finalDescription")}</span>
    </div>
  )
}

export default ConfirmPaymentPage
