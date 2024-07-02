import { cookies } from "next/headers"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Toaster } from "sonner"

import "@/app/globals.css"
import Layout from "@/components/customs/Layout/Layout"
import TanstackProvider from "@/providers/TanstackProvider"
import { parseSession } from "@/utils/parseJwt"
import { AppContextProvider } from "@/web/hooks/useAppContext"

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()
  const tokenValue = cookies().get("Authorization")?.value
  const userInfo = tokenValue ? parseSession(tokenValue).user : { id: "" }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppContextProvider sessionUserInfo={userInfo}>
            <TanstackProvider>
              <Layout>
                {children}
                <Toaster position="bottom-right" richColors />
              </Layout>
            </TanstackProvider>
          </AppContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
