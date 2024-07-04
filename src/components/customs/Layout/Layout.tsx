"use client"

import { type ReactNode } from "react"

import Navbar from "@/components/customs/Layout/Navbar"

type LayoutProps = {
  token: string | undefined
  children?: ReactNode
}

const Layout = ({ children, token }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar token={token} />
      {children}
    </div>
  )
}

export default Layout
