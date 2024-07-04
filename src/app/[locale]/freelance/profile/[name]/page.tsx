"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { CiLocationOn } from "react-icons/ci"
import { IoSettingsOutline } from "react-icons/io5"
import { RxPerson } from "react-icons/rx"
import { toast } from "sonner"

import Spinner from "@/components/customs/Utils/Spinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFullName } from "@/utils/functions"
import useAppContext from "@/web/hooks/useAppContext"
import { useFreelanceProfile } from "@/web/hooks/useProfile"
import routes from "@/web/routes"

const FreelanceAccount = () => {
  const t = useTranslations()
  const router = useRouter()
  const [id] = useQueryState("id")
  const { userInfo } = useAppContext()

  const { isPending, data, error } = useFreelanceProfile(id || "")

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (error) {
    toast.error(t("Error.anErrorOccurred"))
    router.push(routes.home)

    return
  }

  if (data.isError) {
    toast.error(t(`Error.${data.message}`))
    router.push(routes.home)

    return
  }

  return (
    <div className="flex h-full flex-col">
      {userInfo.id === id && (
        <Link
          href={routes.freelance.updateProfile(
            getFullName(data.Users.firstName, data.Users.lastName),
            id,
          )}
          className="cursor-pointer p-5 text-5xl"
        >
          <IoSettingsOutline />
        </Link>
      )}

      <div className="flex h-full flex-col items-center justify-center">
        <div>
          <div className="flex flex-col items-center gap-10 py-10 md:flex-row md:gap-20">
            <Avatar className="h-40 w-40 md:h-52 md:w-52">
              <AvatarImage src={data.Users.avatarUrl} alt="User Avatar" />
              <AvatarFallback>
                <RxPerson className="text-6xl" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-4">
              <h1 className="text-center text-4xl font-bold md:text-start">
                {data.Users.firstName} {data.Users.lastName}
              </h1>
              <p className="text-center text-xl md:text-left">
                {data.Freelance.jobTitle}
              </p>

              <div className="g mt-2 flex items-center justify-center gap-1 md:justify-start">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-6 w-6 text-yellow-500"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                ))}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-300"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.396.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.32-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.63.283.95l-3.523 3.356.83 4.73c.078.443-.35.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-0 md:py-10">
            <div className="flex items-center gap-2 text-xl md:w-full">
              <CiLocationOn className="text-3xl" />
              <p className="text-2xl font-medium">
                {data.Freelance.localisation}
              </p>
            </div>

            <p className="text-2xl font-medium md:w-full">{data.Area.value}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreelanceAccount