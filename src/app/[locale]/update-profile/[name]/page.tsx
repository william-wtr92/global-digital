"use client"

import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { toast } from "sonner"

import { Loading } from "@/components/layout/Loading"
import UpdateProfilForm from "@/features/account/profil/components/UpdateProfileForm"
import { useProfile } from "@/features/account/profil/hooks/useProfile"
import { useAppContext } from "@/hooks/useAppContext"
import { useRouter } from "@/utils/navigation"
import routes from "@/utils/routes"

const FreelanceUpdateProfile = () => {
  const router = useRouter()
  const t = useTranslations()
  const { userInfo } = useAppContext()
  const [id] = useQueryState("id")

  const { data, error, isPending } = useProfile(id!)

  if (userInfo.id !== id) {
    router.push(routes.home)

    return
  }

  if (isPending) {
    return <Loading />
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

  return <UpdateProfilForm profile={data} />
}

export default FreelanceUpdateProfile
