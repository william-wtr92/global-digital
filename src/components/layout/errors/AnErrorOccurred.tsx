import { useTranslations } from "next-intl"

export const AnErrorOccurred = () => {
  const t = useTranslations("Error")

  return (
    <div className="flex h-full items-center justify-center text-xl">
      {t("anErrorOccurred")}
    </div>
  )
}
