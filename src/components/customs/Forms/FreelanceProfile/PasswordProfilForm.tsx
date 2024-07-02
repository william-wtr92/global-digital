"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { apiFetch } from "@/lib/api"
import { PasswordSchema, type PasswordType } from "@/types/formTypes"
import type { Profile } from "@/types/freelance"
import { capitalizeFirstLetter } from "@/utils/forms"
import routes from "@/web/routes"

type PasswordProfilFormProps = {
  profile: Profile
  setProfile: Dispatch<SetStateAction<Profile>>
}

const PasswordProfilForm = ({
  profile,
  setProfile,
}: PasswordProfilFormProps) => {
  const router = useRouter()
  const t = useTranslations()
  const form = useForm<PasswordType>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })
  const mutation = useMutation({
    mutationFn: async () => {
      const data = await apiFetch<Profile>({
        url: routes.api.createAccount,
        method: "POST",
        data: profile,
      })

      if (data.error) {
        if (data.error.constraint === "Users_email_unique") {
          toast.error(t("Error.email_unique"))
        } else {
          toast.error(t("Error.anErrorOccurred"))
        }
      } else {
        toast.success(t("Success.registrationSuccess"))
        router.push(routes.home)
      }
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
          <CustomFormField
            name="password"
            form={form}
            label={capitalizeFirstLetter(t("Form.PasswordProfilForm.password"))}
            placeholder="********"
            description={t("Form.PasswordProfilForm.passwordDescription")}
            passwordField
          />
          <CustomFormField
            name="confirmPassword"
            form={form}
            placeholder="********"
            description={t(
              "Form.PasswordProfilForm.confirmPasswordDescription",
            )}
            passwordField
          />
        </div>
        <Button type="submit">{t("Form.PasswordProfilForm.submit")}</Button>
      </form>
    </Form>
  )
}

export default PasswordProfilForm