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
import { locales } from "@/config"
import { usePathname, useRouter } from "@/navigation"

type LocaleSelectProps = {
  title?: string
}

const LocaleSelect = ({ title }: LocaleSelectProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations()
  const onSelectChange = (value: string) => {
    const nextLocale = value
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale })
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
        {title && <span className="text-lg font-bold">{title}</span>}
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

export default LocaleSelect
