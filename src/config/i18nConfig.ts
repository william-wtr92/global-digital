import type { LocalePrefix } from "next-intl/routing"

export const locales = ["en", "fr"] as const

export type Locale = (typeof locales)[number]

export const localePrefix: LocalePrefix<typeof locales> = "always"
