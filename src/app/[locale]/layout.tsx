import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import "@/app/globals.css"
import Layout from "@/components/customs/Layout/Layout"
import { Toaster } from "@/components/ui/toaster"
import TanstackProvider from "@/providers/TanstackProvider"

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <TanstackProvider>
            <Layout>
              {children}
              <Toaster />
            </Layout>
          </TanstackProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}