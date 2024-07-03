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
import { SC } from "@/def/status"
import { apiFetch } from "@/lib/api"
import { type LoginType, LoginSchema } from "@/types"
import routes from "@/web/routes"

const LoginPage = () => {
  const router = useRouter()
  const t = useTranslations("Login")

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

  const queryClient = useQueryClient()

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

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-10">
      <RoughNotation type="underline" color="#000000" show={true} padding={10}>
        <h1 className="text-4xl font-extrabold">{t("title")}</h1>
      </RoughNotation>
      <div className="w-1/3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-text-large-screen flex flex-col items-center space-y-8 rounded-md bg-white p-6"
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
                  <FormMessage className="relative left-2 text-destructive">
                    {errors.email ? <span>{t("Form.email.error")}</span> : null}
                  </FormMessage>
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
      </div>
    </div>
  )
}

export default LoginPage
