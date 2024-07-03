"use client"

import { usePathname } from "next/navigation"
import { type ReactNode } from "react"

import Navbar from "@/components/customs/Layout/Navbar"

type LayoutProps = {
  token: string | undefined
  children?: ReactNode
}

const Layout = ({ children, token }: LayoutProps) => {
  const pathname = usePathname()
  const isLoginPage = pathname.includes("/login")

  return (
    <div className="flex h-screen flex-col">
      {!isLoginPage && <Navbar token={token} />}
      {children}
    </div>
  )
}

export default Layout
