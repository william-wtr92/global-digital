"use client"

import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { toast } from "sonner"

import UpdateProfilForm from "@/components/customs/Forms/UpdateProfileForm"
import Spinner from "@/components/customs/Utils/Spinner"
import { useGetProfile } from "@/lib/queries/profile"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"

const FreelanceUpdateProfile = () => {
  const router = useRouter()
  const t = useTranslations()
  const { userInfo } = useAppContext()
  const [id] = useQueryState("id")

  const { data, error, isPending } = useGetProfile(id)

  if (userInfo.id !== id) {
    router.push(routes.home)

    return
  }

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

  return <UpdateProfilForm profile={data} id={id} />
}

export default FreelanceUpdateProfile
