import type { Pathnames } from "next-intl/navigation"

export const locales = ["en", "fr"]

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    fr: "/chemin",
  },
} satisfies Pathnames<typeof locales>

// The type of locale prefix is undefined.
// eslint-disable-next-line no-undefined
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
