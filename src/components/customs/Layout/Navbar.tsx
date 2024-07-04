"use client"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { RxPerson } from "react-icons/rx"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { apiFetch } from "@/lib/api"
import { getFullName } from "@/utils/functions"
import { useUser } from "@/web/hooks/useUser"
import routes from "@/web/routes"

type Props = {
  token: string | undefined
}

const Navbar = (props: Props) => {
  const { token } = props

  const router = useRouter()
  const t = useTranslations("Navbar")

  const { data, isLoading, error } = useUser(token)
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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        router.push(routes.missions.search)
      }
    }

    document.addEventListener("keydown", down)

    return () => document.removeEventListener("keydown", down)
  }, [router])

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-300 p-3">
      <Link href={routes.home}>Logo</Link>

      {userInfo ? (
        <div className="flex items-center gap-6 xl:gap-20">
          <div>
            <Link href={routes.missions.search}>
              <p className="text-medium rounded-md border-2 border-gray-200 bg-gray-200 px-4 py-1 hover:shadow-xl">
                <kbd className="flex items-center gap-4 xl:gap-8">
                  <span className="hidden text-sm font-light opacity-55 xl:block">
                    {t("search.placeholder")}
                  </span>
                  <span className="block text-sm font-light opacity-55 xl:hidden">
                    <MagnifyingGlassIcon className="size-5" />
                  </span>
                  <span className="flex items-center gap-1 rounded-md border-2 border-gray-600 border-opacity-20 px-2 text-xs xl:text-sm">
                    <span>ctrl /</span>
                    <span className="text-lg">⌘ </span>
                    <span>K</span>
                  </span>
                </kbd>
              </p>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href={routes.freelance.profile(
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
              className="text-md cursor-pointer rounded-md bg-slate-400 px-3 py-1.5 font-normal"
              variant="ghostNoHover"
              size="none"
              onClickCapture={handleLogout}
            >
              <ArrowLeftStartOnRectangleIcon className="size-6" />
            </Button>
          </div>
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
