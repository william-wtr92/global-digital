"use client"

import { useTranslations } from "next-intl"
import { useState, type Dispatch, type SetStateAction } from "react"
import { MdAddReaction } from "react-icons/md"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { Profile } from "@/types/freelance"

type AvatarFreelanceProfileProps = {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  profile: Profile
  setProfile: Dispatch<SetStateAction<Profile>>
}

const AvatarFreelanceProfile = ({
  currentStep,
  setCurrentStep,
  profile,
  setProfile,
}: AvatarFreelanceProfileProps) => {
  const t = useTranslations("Form")
  const [avatarUrl, setAvatarUrl] = useState("")

  const onSubmit = () => {
    setAvatarUrl("avatarUrl")
    setProfile({ ...profile, avatarUrl })
    toast.success(t("stepCompleted", { currentStep: currentStep + 1 }))
    setCurrentStep(currentStep + 1)
  }

  return (
    <div className="flex flex-col items-center gap-14">
      <div className="flex cursor-pointer flex-col gap-5 rounded-full bg-gray-300 p-10">
        <MdAddReaction className="text-9xl" />
      </div>

      <Button type="submit" onClick={onSubmit}>
        {t("PictureFreelanceProfile.submit")}
      </Button>
    </div>
  )
}

export default AvatarFreelanceProfile
