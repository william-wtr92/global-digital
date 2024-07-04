import Link from "next/link"
import { useTranslations } from "next-intl"

const footerItem = [
  {
    title: "siteMap",
    link: "#",
  },
  {
    title: "legalNotice",
    link: "#",
  },
  {
    title: "aboutUs",
    link: "#",
  },
]

export const Footer = () => {
  const t = useTranslations("Footer")

  return (
    <div className="flex flex-col items-center gap-10 bg-skyBlue py-10">
      <div className="flex flex-col items-center gap-4">
        {footerItem.map((item, index) => (
          <Link href={item.link} key={index} className="uppercase">
            {t(item.title)}
          </Link>
        ))}
      </div>

      <p className="w-64 text-center">{t("rightReserved")}</p>
    </div>
  )
}
