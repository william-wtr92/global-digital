"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import CreateFreelanceProfilForm from "@/components/customs/Forms/CreateProfilForm"
import AvatarFreelanceProfile from "@/components/customs/Forms/FreelanceProfile/AvatarFreelanceProfile"
import MoreAboutFreelanceProfileForm from "@/components/customs/Forms/FreelanceProfile/MoreAboutFreelanceProfileForm"
import PasswordProfilForm from "@/components/customs/Forms/FreelanceProfile/PasswordProfilForm"
import { emptyProfile } from "@/data/profile"

const steps = [
  {
    translationKeyTitle: "createProfileTitle",
    component: CreateFreelanceProfilForm,
  },
  {
    translationKeyTitle: "moreAboutYouTitle",
    component: MoreAboutFreelanceProfileForm,
  },
  {
    translationKeyTitle: "addPictureTitle",
    component: AvatarFreelanceProfile,
  },
  {
    translationKeyTitle: "lastStepTitle",
    component: PasswordProfilForm,
  },
]

const FreelanceCreateProfile = () => {
  const t = useTranslations("Form.FreelanceStep")
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState(emptyProfile)
  const StepComponent = steps[currentStep].component

  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <h1 className="mx-4 text-center text-2xl font-bold md:text-4xl">
        {t(steps[currentStep].translationKeyTitle)}
      </h1>
      <StepComponent
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        profile={profile}
        setProfile={setProfile}
      />
    </div>
  )
}

export default FreelanceCreateProfile
