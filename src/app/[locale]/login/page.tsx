"use client"

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { RoughNotation } from "react-rough-notation"
import { toast } from "sonner"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SC } from "@/def/status"
import { apiFetch } from "@/lib/api"
import { type LoginType, LoginSchema } from "@/types"
import routes from "@/web/routes"

const LoginPage = () => {
  const router = useRouter()
  const t = useTranslations("Login")
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<LoginType>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const {
    formState: { errors },
  } = form

  const { mutateAsync } = useMutation<void, Error, LoginType>({
    mutationKey: [routes.api.auth.login],
    mutationFn: async (data) => {
      const response = await apiFetch<LoginType>({
        url: routes.api.auth.login,
        method: "POST",
        data,
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <RoughNotation type="underline" color="#000000" show={true} padding={10}>
        <h1 className="text-4xl font-extrabold">{t("title")}</h1>
      </RoughNotation>
      <div className="w-4/5 xl:w-1/3">
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative w-full">
                  <FormLabel className="relative left-1 flex items-center gap-2 font-bold text-neutral-800">
                    {t("Form.password.label")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="focus-visible:outline-accent-500 mt-2 px-4 py-2 focus-visible:border-0 focus-visible:ring-0"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("Form.password.placeholder")}
                        {...field}
                      />
                      {showPassword ? (
                        <EyeSlashIcon
                          className="absolute right-2 top-1/4 h-5 w-4 hover:cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      ) : (
                        <EyeIcon
                          className="absolute right-2 top-1/4 h-5 w-4 hover:cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="relative left-2 text-destructive">
                    {errors.password ? (
                      <span>{t("Form.password.error")}</span>
                    ) : null}
                  </FormMessage>
                </FormItem>
              )}
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
