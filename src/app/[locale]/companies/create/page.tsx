"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { UUID } from "crypto"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
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
import { apiFetch, type ApiResponse } from "@/lib/api"
import { capitalizeFirstLetter } from "@/utils/forms"
import type { ReadonlyArrayZod } from "@/utils/types"
import {
  companiesCreateFormValidator,
  type CompaniesCreateValidatorType,
} from "@/utils/validators/companies"
import routes from "@/web/routes"

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
    mutationKey: [routes.api.companies.create],
    mutationFn: async (data) => {
      await apiFetch<CompaniesCreateValidatorType>({
        url: routes.api.companies.create,
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
          <CustomFormField
            form={companiesCreateForm}
            name="address"
            placeholder={t("address.placeholder")}
            label={t("address.label")}
            description={t("address.description")}
          />
          <CustomFormField
            form={companiesCreateForm}
            name="businessName"
            placeholder={t("businessName.placeholder")}
            label={t("businessName.label")}
            description={t("businessName.description")}
          />
          <CustomFormField
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
                          {capitalizeFirstLetter(area.value)}
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
          <CustomFormField
            form={companiesCreateForm}
            name="headquarters"
            placeholder={t("headquarters.placeholder")}
            label={t("headquarters.label")}
            description={t("headquarters.description")}
          />
          <CustomFormField
            form={companiesCreateForm}
            name="kbis"
            placeholder={t("kbis.placeholder")}
            label={t("kbis.label")}
            description={t("kbis.description")}
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