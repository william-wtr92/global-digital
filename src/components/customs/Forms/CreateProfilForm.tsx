"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SignupFormSchema, type SignupType } from "@/types/formTypes"
import type { Profile } from "@/types/freelance"
import { capitalizeFirstLetter } from "@/utils/forms"

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
    resolver: zodResolver(SignupFormSchema),
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
              label={capitalizeFirstLetter(t(`CreateProfilForm.${field}`))}
              placeholder={capitalizeFirstLetter(
                t(`CreateProfilForm.${field}`),
              )}
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
