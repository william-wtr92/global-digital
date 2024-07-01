import { type ReactNode } from "react"

import Navbar from "@/components/customs/Layout/Navbar"

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      {children}
    </div>
  )
}

export default Layout
