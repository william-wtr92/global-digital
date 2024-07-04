"use client"

import { type ReactNode } from "react"

import Footer from "@/components/customs/Layout/Footer"
import Navbar from "@/components/customs/Layout/Navbar"

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
