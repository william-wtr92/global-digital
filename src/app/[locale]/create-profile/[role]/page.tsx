"use client"

import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"

import CreateFreelanceProfilForm from "@/components/customs/Forms/CreateProfilForm"
import AvatarFreelanceProfile from "@/components/customs/Forms/FreelanceProfile/AvatarFreelanceProfile"
import MoreAboutFreelanceProfileForm from "@/components/customs/Forms/FreelanceProfile/MoreAboutFreelanceProfileForm"
import PasswordProfilForm from "@/components/customs/Forms/FreelanceProfile/PasswordProfilForm"
import { emptyProfile } from "@/data/profile"
import routes from "@/web/routes"

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

const FreelanceCreateProfile = () => {
  const { role } = useParams() as { role: string }
  const router = useRouter()
  const t = useTranslations("Form.FreelanceStep")
  const [currentStep, setCurrentStep] = useState(0)
  const [profile, setProfile] = useState(emptyProfile)

  if (role !== "freelance" && role !== "recruiter") {
    router.push(routes.registration)

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

export default FreelanceCreateProfile
