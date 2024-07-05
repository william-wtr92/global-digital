"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import type { UUID } from "crypto"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { CustomFormInput } from "@/components/forms/CustomFormInput"
import { Button } from "@/components/ui/button"
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
import type { SelectCompany } from "@/db/schema"
import {
  companiesUpdateFormValidator,
  type CompaniesUpdateValidatorType,
} from "@/features/companies/utils/validators/companies"
import { apiFetch, type ApiResponse } from "@/lib/api"
import type { ReadonlyArrayZod } from "@/types/utils"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

const CompaniesUpdatePage = () => {
  const { id } = useParams()
  const router = useRouter()
  const { data: company, isSuccess } = useQuery<ApiResponse<SelectCompany>>({
    queryKey: [routes.api.companies[":id"].index(id as string)],
    queryFn: () =>
      apiFetch({ url: routes.api.companies[":id"].index(id as string) }),
  })
  const { data: areas } = useQuery<ApiResponse<{ id: UUID; value: string }[]>>({
    enabled: isSuccess,
    queryKey: [routes.api.areas.index],
    queryFn: () => apiFetch({ url: routes.api.areas.index }),
  })

  const t = useTranslations("CompaniesUpdatePage")
  const companiesUpdateForm = useForm<CompaniesUpdateValidatorType>({
    resolver: zodResolver(
      companiesUpdateFormValidator(
        areas?.data.map((area) => area.value) as unknown as ReadonlyArrayZod,
      ),
    ),
    defaultValues: {
      headquarters: company?.data.headQuarter,
      areaId: company?.data.areaId,
      businessName: company?.data.businessName,
      descriptionCompany: company?.data.description,
      kbis: company?.data.kbisUrl,
      logo: company?.data.logo,
    },
  })
  const { mutateAsync } = useMutation<
    void,
    Error,
    CompaniesUpdateValidatorType
  >({
    mutationKey: [routes.api.companies.index],
    mutationFn: async (data) => {
      await apiFetch<CompaniesUpdateValidatorType>({
        url: routes.api.companies[":id"].index(id as string),
        method: "PUT",
        data,
      })
    },
  })

  const onSubmit = async (values: CompaniesUpdateValidatorType) => {
    await mutateAsync(values)
    router.replace(routes.companies[":id"].index(id as string))
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-5">
      <h1 className="text-2xl">{t("title")}</h1>
      <Form {...companiesUpdateForm}>
        <form
          onSubmit={companiesUpdateForm.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <CustomFormInput
            form={companiesUpdateForm}
            name="businessName"
            placeholder={t("businessName.placeholder")}
            label={t("businessName.label")}
            description={t("businessName.description")}
          />
          <CustomFormInput
            form={companiesUpdateForm}
            name="logo"
            placeholder={t("logo.placeholder")}
            label={t("logo.label")}
            description={t("logo.description")}
          />
          <FormField
            control={companiesUpdateForm.control}
            name="areaId"
            render={({ field }) => (
              <FormItem className="w-screen max-w-96 px-4">
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
            form={companiesUpdateForm}
            name="headquarters"
            placeholder={t("headquarters.placeholder")}
            label={t("headquarters.label")}
            description={t("headquarters.description")}
          />
          <CustomFormInput
            form={companiesUpdateForm}
            name="kbis"
            placeholder={t("kbis.placeholder")}
            label={t("kbis.label")}
            description={t("kbis.description")}
          />
          <FormField
            control={companiesUpdateForm.control}
            name="descriptionCompany"
            render={({ field }) => (
              <FormItem className="w-screen max-w-96 px-4">
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
          <Button type="submit">{t("button")}</Button>
        </form>
      </Form>
    </div>
  )
}

export default CompaniesUpdatePage
