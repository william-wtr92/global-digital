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
import { loginSchema, type LoginType } from "@/features/auth/login/types/login"
import { apiFetch } from "@/lib/api"
import { SC } from "@/utils/constants/status"
import routes from "@/utils/routes"

const LoginPage = () => {
  const router = useRouter()
  const t = useTranslations("Login")
  const queryClient = useQueryClient()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<LoginType>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
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
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("Form.error"))

        return
      }

      toast.success(t("Form.success"))
      router.push(routes.home)
    },
  })

  const onSubmit = async (values: LoginType) => {
    await mutateAsync(values)
    await queryClient.invalidateQueries({ queryKey: ["user"] })
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="relative left-1 font-bold text-neutral-800">
                    {t("Form.email.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:outline-accent-500 mt-2 px-4 py-2 focus-visible:border-0 focus-visible:ring-0"
                      type="email"
                      placeholder={t("Form.email.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="relative left-2 text-destructive" />
                </FormItem>
              )}
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
                  <FormMessage className="relative left-2 text-destructive" />
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
              className={`w-1/2 bg-darkBlue py-2.5 font-semibold text-white ${!form.formState.isValid ? "cursor-not-allowed opacity-50" : "bg-gray-700 hover:cursor-pointer"}`}
              type="submit"
            >
              {t("Form.submit")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
