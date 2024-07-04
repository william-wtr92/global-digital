"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { RoughNotation } from "react-rough-notation"
import { toast } from "sonner"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SC } from "@/def/status"
import { apiFetch } from "@/lib/api"
import { type LoginType, LoginSchema } from "@/types"
import routes from "@/web/routes"

const LoginPage = () => {
  const router = useRouter()
  const t = useTranslations("Login")
  const queryClient = useQueryClient()

  const form = useForm<LoginType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutateAsync } = useMutation<void, Error, LoginType>({
    mutationKey: [routes.api.auth.login],
    mutationFn: async (data) => {
      const response = await apiFetch<LoginType>({
        url: routes.api.auth.login,
        method: "POST",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("Form.error"))

        return
      }

      await queryClient.invalidateQueries({ queryKey: ["user"] })
      toast.success(t("Form.success"))
      router.push(routes.home)
    },
  })

  const onSubmit = async (values: LoginType) => {
    await mutateAsync(values)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <RoughNotation type="underline" color="#000000" show={true} padding={10}>
        <h1 className="text-4xl font-extrabold">{t("title")}</h1>
      </RoughNotation>
      <>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-6"
          >
            <CustomFormField
              name="email"
              form={form}
              label={t("Form.email.label")}
              placeholder={t("Form.email.label")}
              description={t("Form.email.placeholder")}
            />
            <CustomFormField
              name="password"
              form={form}
              label={t("Form.password.label")}
              placeholder={t("Form.password.label")}
              description={t("Form.password.placeholder")}
              passwordField
            />
            <Link
              className="font-bold underline underline-offset-4"
              href={routes.home}
            >
              {t("Form.passwordForgotten")}
            </Link>
            <Button
              disabled={!form.formState.isValid}
              className={`w-1/2 bg-gray-400 py-2.5 font-semibold text-white ${!form.formState.isValid ? "cursor-not-allowed opacity-50" : "bg-gray-800 hover:cursor-pointer"}`}
              type="submit"
            >
              {t("Form.submit")}
            </Button>
          </form>
        </Form>
      </>
    </div>
  )
}

export default LoginPage
