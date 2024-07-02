import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

// Can be imported from a shared config
const locales = ["en", "fr"]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) {
    notFound()
  }

  return {
    messages: (await import(`@/i18n/${locale}.json`)).default,
  }
})
