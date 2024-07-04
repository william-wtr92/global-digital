import type { Pathnames, LocalePrefix } from "next-intl/routing"

export const locales = ["en", "fr"]

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    fr: "/chemins",
  },
} satisfies Pathnames<typeof locales>

export const localePrefix: LocalePrefix<typeof locales> = "always"

export type AppPathnames = keyof typeof pathnames
