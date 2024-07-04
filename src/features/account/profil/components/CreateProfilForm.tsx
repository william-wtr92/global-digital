"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import CustomFormField from "@/components/forms/CustomFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  signupFormSchema,
  type SignupType,
} from "@/features/auth/registration/utils/validators/form"
import type { Profile } from "@/features/freelance/types/freelance"
import { firstLetterUppercase } from "@/utils/string"

type CreateProfilFormProps = {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  profile: Profile
  setProfile: Dispatch<SetStateAction<Profile>>
}

const fields = ["firstName", "lastName", "email", "phoneNumber"] as const

const CreateProfilForm = ({
  currentStep,
  setCurrentStep,
  profile,
  setProfile,
}: CreateProfilFormProps) => {
  const t = useTranslations("Form")
  const form = useForm<SignupType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  })

  const onSubmit = (data: SignupType) => {
    setProfile({ ...profile, ...data })
    toast.success(t("stepCompleted", { currentStep: currentStep + 1 }))
    setCurrentStep(currentStep + 1)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex flex-col gap-5">
          {fields.map((field) => (
            <CustomFormField
              key={field}
              name={field}
              form={form}
              label={firstLetterUppercase(t(`CreateProfilForm.${field}`))}
              placeholder={firstLetterUppercase(t(`CreateProfilForm.${field}`))}
              description={t("CreateProfilForm.description", {
                field: t(`CreateProfilForm.${field}`),
              })}
            />
          ))}
        </div>
        <Button type="submit">{t("CreateProfilForm.submit")}</Button>
      </form>
    </Form>
  )
}

export default CreateProfilForm
