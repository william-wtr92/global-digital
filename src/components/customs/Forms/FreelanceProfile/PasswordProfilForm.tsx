"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { apiFetch } from "@/lib/api"
import { PasswordSchema, type PasswordType } from "@/types/formTypes"
import type { FreelanceProfile } from "@/types/freelance"
import { capitalizeFirstLetter } from "@/utils/forms"
import routes from "@/web/routes"

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
    resolver: zodResolver(PasswordSchema),
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
          <CustomFormField
            name="password"
            form={form}
            label={capitalizeFirstLetter(t("Form.PasswordProfilForm.password"))}
            placeholder="********"
            description={t("Form.PasswordProfilForm.passwordDescription")}
            type="password"
          />
          <CustomFormField
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
