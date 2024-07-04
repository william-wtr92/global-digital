"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { CustomFormInput } from "@/components/forms/CustomFormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  passwordSchema,
  type PasswordType,
} from "@/features/auth/register/utils/validators/form"
import type { FreelanceProfile } from "@/features/freelance/types/freelance"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

type PasswordProfilFormProps = {
  profile: FreelanceProfile
  setProfile: Dispatch<SetStateAction<FreelanceProfile>>
}

const PasswordProfilForm = ({
  profile,
  setProfile,
}: PasswordProfilFormProps) => {
  const router = useRouter()
  const { role } = useParams() as { role: string }
  const t = useTranslations()
  const form = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await apiFetch({
        url: routes.api.auth.register,
        method: "POST",
        data: { profile, role },
      })

      if (response.data.error) {
        if (
          response.data.error.constraint === "Users_email_unique" ||
          response.data.error.constraint_name === "Users_email_unique"
        ) {
          toast.error(t("Error.email_unique"))
        } else {
          toast.error(t("Error.anErrorOccurred"))
        }
      } else {
        toast.success(t("Success.registrationSuccess"))
        router.push(routes.home)
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: () => {
      toast.error(t("Error.anErrorOccurred"))
    },
  })

  const onSubmit = (data: PasswordType) => {
    if (data.password !== data.confirmPassword) {
      toast.error(t("Form.PasswordProfilForm.passwordsDoNotMatch"))

      return
    }

    setProfile({ ...profile, password: data.password })
    mutation.mutate()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex flex-col gap-5">
          <CustomFormInput
            name="password"
            form={form}
            label={firstLetterUppercase(t("Form.PasswordProfilForm.password"))}
            placeholder="********"
            description={t("Form.PasswordProfilForm.passwordDescription")}
            type="password"
          />
          <CustomFormInput
            name="confirmPassword"
            form={form}
            placeholder="********"
            description={t(
              "Form.PasswordProfilForm.confirmPasswordDescription",
            )}
            type="password"
          />
        </div>
        <Button type="submit">{t("Form.PasswordProfilForm.submit")}</Button>
      </form>
    </Form>
  )
}

export default PasswordProfilForm
