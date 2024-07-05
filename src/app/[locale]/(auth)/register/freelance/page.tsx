"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import CreateFreelanceProfilForm from "@/features/account/profil/components/CreateProfilForm"
import AvatarFreelanceProfile from "@/features/freelance/components/FreelanceProfile/AvatarFreelanceProfile"
import MoreAboutFreelanceProfileForm from "@/features/freelance/components/FreelanceProfile/MoreAboutFreelanceProfileForm"
import PasswordProfilForm from "@/features/freelance/components/FreelanceProfile/PasswordProfilForm"
import type { Profile } from "@/features/freelance/types/freelance"

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

const emptyProfile: Profile = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  jobTitle: "",
  businessName: "",
  areaId: "",
  localisation: "",
  registrationNumber: "",
  avatarUrl: "",
  password: "",
}

const FreelanceCreateProfile = () => {
  const t = useTranslations("Form.FreelanceStep")
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState(emptyProfile)
  const StepComponent = steps[currentStep].component

  return (
    <div className="flex h-full flex-col justify-center gap-10 py-10">
      <h1 className="mx-4 text-center text-2xl font-bold text-blueText md:text-4xl">
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
