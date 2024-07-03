"use client"

import { useRouter } from "next/navigation"
import { useQueryState } from "nuqs"

import AccountPage from "@/components/customs/Freelance/AccountPage"
import routes from "@/web/routes"

const FreelanceAccount = () => {
  const [id] = useQueryState("id") as string[]
  const router = useRouter()

  if (!id) {
    router.push(routes.home)

    return
  }

  return <AccountPage id={id} />
}

export default FreelanceAccount
