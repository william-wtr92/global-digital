"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { UUID } from "crypto"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { CustomFormInput } from "@/components/forms/CustomFormInput"
import { CustomFormTextarea } from "@/components/forms/CustomFormTextarea"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  companiesCreateFormValidator,
  type CompaniesCreateValidatorType,
} from "@/features/companies/utils/validators/companies"
import { apiFetch, type ApiResponse } from "@/lib/api"
import type { ReadonlyArrayZod } from "@/types/utils"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

const CompaniesCreatePage = () => {
  const { data: areas } = useQuery<ApiResponse<{ id: UUID; value: string }[]>>({
    queryKey: [routes.api.areas.index],
    queryFn: () => apiFetch({ url: routes.api.areas.index }),
  })
  const t = useTranslations("CompaniesCreatePage")
  const companiesCreateForm = useForm<CompaniesCreateValidatorType>({
    resolver: zodResolver(
      companiesCreateFormValidator(
        areas?.data.map((area) => area.value) as unknown as ReadonlyArrayZod,
      ),
    ),
  })
  const { mutateAsync } = useMutation<
    void,
    Error,
    CompaniesCreateValidatorType
  >({
    mutationKey: [routes.api.companies.index],
    mutationFn: async (data) => {
      await apiFetch<CompaniesCreateValidatorType>({
        url: routes.api.companies.index,
        method: "POST",
        data,
      })
    },
  })

  const onSubmit = (values: CompaniesCreateValidatorType) => mutateAsync(values)

  return (
    <div className="mt-6 flex flex-col items-center gap-5">
      <h1 className="text-2xl">{t("title")}</h1>
      <Form {...companiesCreateForm}>
        <form
          onSubmit={companiesCreateForm.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <CustomFormInput
            form={companiesCreateForm}
            name="businessName"
            placeholder={t("businessName.placeholder")}
            label={t("businessName.label")}
            description={t("businessName.description")}
          />
          <CustomFormInput
            form={companiesCreateForm}
            name="logo"
            placeholder={t("logo.placeholder")}
            label={t("logo.label")}
            description={t("logo.description")}
          />
          <FormField
            control={companiesCreateForm.control}
            name="areaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("area.label")}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("area.placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      {areas?.data.map((area) => (
                        <SelectItem value={area.value} key={area.id}>
                          {firstLetterUppercase(area.value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>{t("area.description")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <CustomFormInput
            form={companiesCreateForm}
            name="headquarters"
            placeholder={t("headquarters.placeholder")}
            label={t("headquarters.label")}
            description={t("headquarters.description")}
          />
          <CustomFormInput
            form={companiesCreateForm}
            name="kbis"
            placeholder={t("kbis.placeholder")}
            label={t("kbis.label")}
            description={t("kbis.description")}
          />
          <CustomFormTextarea
            form={companiesCreateForm}
            name="descriptionCompany"
            description={t("descriptionCompany.description")}
            label={t("descriptionCompany.label")}
            placeholder={t("descriptionCompany.placeholder")}
          />
          <FormField
            control={companiesCreateForm.control}
            name="accept"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>{t("accept.label")}</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("button")}</Button>
        </form>
      </Form>
    </div>
  )
}

export default CompaniesCreatePage
