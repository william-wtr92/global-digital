"use client"
import { useMutation } from "@tanstack/react-query"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { RxPerson } from "react-icons/rx"

import { apiFetch } from "@/lib/api"
import { useUser } from "@/web/hooks/useUser"
import { Button } from "@/components/ui/button"
import routes from "@/web/routes"

const Navbar = () => {
  const router = useRouter()
  const t = useTranslations("Navbar")

  const { data, isLoading, error } = useUser()
  const userInfo = !isLoading && !error ? data?.userConnected : null

  const mutation = useMutation<void, Error>({
    mutationKey: [routes.api.auth.logout],
    mutationFn: async () => {
      await apiFetch({
        url: routes.api.auth.logout,
        method: "PUT",
        data: null,
        credentials: "include",
      })
    },
    onSuccess: () => {
      toast.success(t("logoutSuccess"))
      router.push(routes.login)
    },
  })

  const handleLogout = () => {
    mutation.mutate()
  }

  return (
    <div className="flex items-center justify-between bg-gray-300 p-3">
      <Link href={routes.home}>Logo</Link>

      {userInfo ? (
        <div className="flex items-center gap-10">
          <RxPerson className="text-3xl" />
          <Button
            onClick={handleLogout}
            className="text-md rounded-full bg-slate-400 px-4 py-1 font-normal"
            variant="ghostNoHover"
            size="none"
          >
            {t("logout")}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href={routes.registration}>{t("signup")}</Link>
          <Link
            href={routes.home}
            className="rounded-full bg-slate-400 px-4 py-1"
          >
            {t("login")}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
