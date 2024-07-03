import {
  ArrowLeftStartOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { apiFetch } from "@/lib/api"
import { useUser } from "@/web/hooks/useUser"
import routes from "@/web/routes"

const Navbar = () => {
  const router = useRouter()
  const t = useTranslations("Navbar")

  const { data, isLoading, error } = useUser()
  const user = !isLoading && !error ? data?.userConnected : null

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
      {user ? (
        <div className="flex items-center gap-8">
          <div className="flex cursor-pointer items-center gap-1.5">
            <UserIcon className="size-6" />
            <span className="font-semibold">{user.firstName}</span>
          </div>
          <span className="cursor-pointer rounded-md bg-gray-400 px-4 py-1.5">
            <ArrowLeftStartOnRectangleIcon
              className="size-6"
              onClick={handleLogout}
            />
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link href={routes.home}>{t("signup")}</Link>
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
