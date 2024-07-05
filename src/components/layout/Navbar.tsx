"use client"

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { RxCross2, RxHamburgerMenu, RxPerson } from "react-icons/rx"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { LocaleSelect } from "@/components/utils/LocaleSelect"
import { useUser } from "@/features/account/hooks/useUser"
import { useAppContext } from "@/hooks/useAppContext"
import { apiFetch } from "@/lib/api"
import { getFullNameLowerCase } from "@/utils/functions"
import routes from "@/utils/routes"

export const Navbar = () => {
  const { token, userInfo, setUserInfo } = useAppContext()
  const { data, isLoading, error } = useUser(token)
  const router = useRouter()
  const t = useTranslations("Navbar")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const queryClient = useQueryClient()

  const mutation = useMutation<void, Error>({
    mutationKey: [routes.api.auth.logout],
    mutationFn: async () => {
      await apiFetch({
        url: routes.api.auth.logout,
        method: "PUT",
        credentials: "include",
      })
    },
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    toggleMenu()
    await mutation.mutateAsync()
    await queryClient.invalidateQueries({ queryKey: ["user"] })
    setUserInfo({ id: "", firstName: "", lastName: "" })
    toast.success(t("logoutSuccess"))
    router.push(routes.login)
  }

  useEffect(() => {
    if (data && !isLoading && !error) {
      setUserInfo(data.userConnected)
    }
  }, [data, isLoading, error, setUserInfo])

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
    <div className="sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between bg-medianBlue p-3">
        <Link href={routes.home} className="text-xl font-bold">
          CYBERLINKER
        </Link>

        {userInfo && userInfo.id ? (
          <div className="hidden items-center gap-6 md:flex xl:gap-20">
            <Link href={routes.missions.search}>
              <p className="text-medium rounded-md border-2 border-black border-opacity-20 bg-medianBlue px-4 py-1 hover:shadow-xl">
                <kbd className="flex items-center gap-4 xl:gap-8">
                  <span className="hidden text-sm font-light opacity-55 xl:block">
                    {t("search.placeholder")}
                  </span>
                  <span className="block text-sm font-light opacity-55 xl:hidden">
                    <MagnifyingGlassIcon className="size-5" />
                  </span>
                  <span className="flex items-center gap-1 rounded-md border-2 border-black border-opacity-20 px-2 text-xs xl:text-sm">
                    <span>ctrl /</span>
                    <span className="text-lg">⌘ </span>
                    <span>K</span>
                  </span>
                </kbd>
              </p>
            </Link>

            <div className="flex items-center gap-8">
              <Link
                href={routes.profile(
                  getFullNameLowerCase(userInfo.firstName, userInfo.lastName),
                  userInfo.id,
                )}
                className="flex cursor-pointer items-center gap-1.5"
              >
                <RxPerson className="text-2xl" />
                <span className="font-semibold">{userInfo.firstName}</span>
              </Link>
              <LocaleSelect />
              <Button
                onClick={handleLogout}
                className="text-md cursor-pointer rounded-md bg-darkBlue px-3 py-1.5 font-normal text-white"
                variant="ghostNoHover"
                size="none"
                onClickCapture={handleLogout}
              >
                <ArrowLeftStartOnRectangleIcon className="size-6" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href={routes.register.index}
              onClick={toggleMenu}
              className="text-lg font-bold"
            >
              {t("signup")}
            </Link>
            <Link
              href={routes.login}
              onClick={toggleMenu}
              className="rounded-full bg-darkBlue px-4 py-1 text-white"
            >
              {t("login")}
            </Link>
            <LocaleSelect />
          </div>
        )}

        <Button
          className="cursor-pointer text-3xl md:hidden"
          variant="ghostNoHover"
          size="none"
          onClick={toggleMenu}
        >
          <RxHamburgerMenu />
        </Button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 flex flex-col bg-medianBlue md:hidden">
          <div className="flex h-16 items-center justify-between p-3">
            <Link
              href={routes.home}
              onClick={toggleMenu}
              className="text-xl font-bold"
            >
              CYBERLINKER
            </Link>
            <Button
              className="cursor-pointer text-3xl"
              variant="ghostNoHover"
              size="none"
              onClick={toggleMenu}
            >
              <RxCross2 />
            </Button>
          </div>

          <div className="flex flex-grow flex-col items-center justify-center">
            {userInfo && userInfo.id ? (
              <div className="flex flex-col items-center gap-10">
                <Link
                  href={routes.profile(
                    getFullNameLowerCase(userInfo.firstName, userInfo.lastName),
                    userInfo.id,
                  )}
                  onClick={toggleMenu}
                  className="flex items-center gap-1.5 text-3xl"
                >
                  <RxPerson className="text-5xl" />
                  <span className="font-semibold">{userInfo.firstName}</span>
                </Link>
                <Button
                  variant="ghostNoHover"
                  size="none"
                  onClick={handleLogout}
                  className="rounded-full bg-darkBlue px-10 py-2 text-2xl font-bold text-white"
                >
                  {t("logout")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-10">
                <Link
                  href={routes.register.index}
                  onClick={toggleMenu}
                  className="text-3xl font-bold"
                >
                  {t("signup")}
                </Link>
                <Link
                  href={routes.login}
                  onClick={toggleMenu}
                  className="rounded-full bg-darkBlue px-10 py-2 text-2xl font-bold text-white"
                >
                  {t("login")}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 pb-5">
            <LocaleSelect />
          </div>
        </div>
      )}
    </div>
  )
}
