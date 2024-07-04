import { Toaster } from "sonner"

import "@/app/globals.css"

import { BaseLayout } from "@/layouts/BaseLayout"
import { AppContextProvider } from "@/providers/AppContext"
import { IntlClientProvider } from "@/providers/NextIntlClientProvider"
import TanstackProvider from "@/providers/TanstackProvider"

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale}>
      <body>
        <IntlClientProvider>
          <AppContextProvider>
            <TanstackProvider>
              <BaseLayout>
                {children}
                <Toaster position="bottom-right" richColors />
              </BaseLayout>
            </TanstackProvider>
          </AppContextProvider>
        </IntlClientProvider>
      </body>
    </html>
  )
}
