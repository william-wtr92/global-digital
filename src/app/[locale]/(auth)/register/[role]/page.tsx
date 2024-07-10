"use client"

import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

import CreateFreelanceProfilForm from "@/features/account/profil/components/CreateProfilForm"
import AvatarFreelanceProfile from "@/features/auth/register/components/AvatarFreelanceProfile"
import MoreAboutFreelanceProfileForm from "@/features/auth/register/components/MoreAboutFreelanceProfileForm"
import PasswordProfilForm from "@/features/auth/register/components/PasswordProfilForm"
import type { FreelanceProfile } from "@/features/freelance/types/freelance"
import routes from "@/utils/routes"

const steps = (role: string) => [
  {
    translationKeyTitle: "createProfileTitle",
    component: CreateFreelanceProfilForm,
  },
  ...(role === "freelance"
    ? [
        {
          translationKeyTitle: "moreAboutYouTitle",
          component: MoreAboutFreelanceProfileForm,
        },
      ]
    : []),
  {
    translationKeyTitle: "addPictureTitle",
    component: AvatarFreelanceProfile,
  },
  {
    translationKeyTitle: "lastStepTitle",
    component: PasswordProfilForm,
  },
]

const emptyProfile: FreelanceProfile = {
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

const CreateProfile = () => {
  const { role } = useParams<{ role: string }>()
  const router = useRouter()
  const t = useTranslations("Form.FreelanceStep")
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState(emptyProfile)

  if (role !== "freelance" && role !== "recruiter") {
    router.push(routes.register.index)

    return
  }

  const StepComponent = steps(role)[currentStep].component

  return (
    <div className="flex h-full flex-col justify-center gap-10 py-10">
      <h1 className="mx-4 text-center text-2xl font-bold text-blueText md:text-4xl">
        {t(steps(role)[currentStep].translationKeyTitle)}
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

export default CreateProfile
