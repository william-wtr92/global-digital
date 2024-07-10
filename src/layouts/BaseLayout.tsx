import { type ReactNode } from "react"

import { Footer } from "@/components/layout/Footer"
import { Navbar } from "@/components/layout/Navbar"

type LayoutProps = {
  children?: ReactNode
}

export const BaseLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
