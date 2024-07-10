/* eslint-disable complexity */

import { type NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { locales, type Locale } from "@/config/i18nConfig"
import routes from "@/utils/routes"

const adminPathname = "/admin"
const middlewareI18n = createMiddleware({
  locales,
  defaultLocale: "en",
})

export default function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith(adminPathname)
  const token = request.cookies.get("Authorization")

  if (!isAdminRoute) {
    const res = middlewareI18n(request)
    const [, locale] = request.nextUrl.pathname.split("/")
    const publicAndPrivateRoutes = [``]
    const isAlwaysOk = publicAndPrivateRoutes.some(
      (option) =>
        request.nextUrl.pathname === option ||
        request.nextUrl.pathname.startsWith(option),
    )

    if (isAlwaysOk) {
      return res
    }

    const publicRoutes = [
      `/${locale}/login`,
      `/${locale}/`,
      `${locale}/create-profile`,
    ]
    const isPublic = publicRoutes.some((option) =>
      request.nextUrl.pathname.startsWith(option),
    )
    const redirectUrl = new URL(request.nextUrl.toString())

    if (!token && !isPublic && locales.includes(locale as Locale)) {
      redirectUrl.pathname = `/${locale}${routes.login}`

      return NextResponse.redirect(redirectUrl)
    }

    if (token && isPublic) {
      redirectUrl.pathname = `/${locale}${routes.home}`

      return NextResponse.redirect(redirectUrl)
    }

    return res
  }

  return null
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
