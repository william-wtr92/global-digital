"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { RxPerson } from "react-icons/rx"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"
import { getFullName } from "@/utils/functions"
import { useUser } from "@/web/hooks/useUser"
import routes from "@/web/routes"

const Navbar = () => {
  const router = useRouter()
  const t = useTranslations("Navbar")

  const { data, isLoading, error } = useUser()
  const userInfo = !isLoading && !error ? data?.userConnected : null
  const queryClient = useQueryClient()
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
      queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success(t("logoutSuccess"))
      router.push(routes.login)
    },
  })

  const handleLogout = () => {
    mutation.mutate()
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-300 p-3">
      <Link href={routes.home}>Logo</Link>

      {userInfo ? (
        <div className="flex items-center gap-10">
          <Link
            href={routes.profile(
              getFullName(userInfo.firstName, userInfo.lastName),
              userInfo.id,
            )}
            className="flex cursor-pointer items-center gap-1.5"
          >
            <RxPerson className="text-2xl" />
            <span className="font-semibold">{userInfo.firstName}</span>
          </Link>
          <Button
            onClick={handleLogout}
            className="text-md cursor-pointer rounded-full bg-slate-400 px-4 py-1 font-normal"
            variant="ghostNoHover"
            size="none"
            onClickCapture={handleLogout}
          >
            {t("logout")}
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href={routes.registration}>{t("signup")}</Link>
          <Link
            href={routes.login}
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
