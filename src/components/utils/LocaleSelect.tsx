import { useLocale, useTranslations } from "next-intl"
import { useTransition } from "react"
import { CiGlobe } from "react-icons/ci"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { locales, type Locale } from "@/config/i18nConfig"
import { usePathname, useRouter } from "@/utils/navigation"

export const LocaleSelect = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()
  const onSelectChange = (value: Locale) => {
    const nextLocale = value
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <Select
      defaultValue={currentLocale}
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger className="animate-fade-down animate-once m-0 flex w-fit gap-2 p-0">
        <CiGlobe className="text-4xl" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem
              key={locale}
              value={locale}
              className="text-dark cursor-pointer hover:bg-skyBlue"
            >
              {t("LocaleSelect.locale", { locale })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
