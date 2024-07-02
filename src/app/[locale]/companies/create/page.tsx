"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const companiesCreateValidator = z.object({
  address: z.string().min(1),
  businessName: z.string().min(1),
  logo: z.string(),
  headquarters: z.string().min(1),
  kbis: z.string(),
  descriptionCompany: z.string().min(1),
  accept: z.boolean(),
})

const CompaniesCreatePage = () => {
  const t = useTranslations("CompaniesCreatePage")

  const companiesCreateForm = useForm<z.infer<typeof companiesCreateValidator>>(
    {
      resolver: zodResolver(companiesCreateValidator),
    },
  )

  const onSubmit = (values: z.infer<typeof companiesCreateValidator>) => {
    console.log(values)
  }

  return (
    <>
      <h1 className="text-2xl">{t("title")}</h1>
      <Form {...companiesCreateForm}>
        <form
          onSubmit={companiesCreateForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={companiesCreateForm.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address.label")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("address.placeholder")} {...field} />
                </FormControl>
                <FormDescription>{t("address.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companiesCreateForm.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("businessName.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("businessName.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("businessName.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companiesCreateForm.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("logo.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("logo.placeholder")}
                    type="file"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("logo.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companiesCreateForm.control}
            name="headquarters"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("headquarters.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("headquarters.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("headquarters.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companiesCreateForm.control}
            name="kbis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("kbis.label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("kbis.placeholder")}
                    type="file"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("kbis.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companiesCreateForm.control}
            name="descriptionCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("descriptionCompany.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("descriptionCompany.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("descriptionCompany.description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companiesCreateForm.control}
            name="accept"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox {...field} />
                </FormControl>
                <FormLabel>{t("accept.label")}</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("button")}</Button>
        </form>
      </Form>
    </>
  )
}

export default CompaniesCreatePage
