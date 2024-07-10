"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { CustomFormField } from "@/components/forms/CustomFormField"
import { CustomFormInput } from "@/components/forms/CustomFormInput"
import { CustomFormTextarea } from "@/components/forms/CustomFormTextarea"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAreas } from "@/features/areas/hooks/useAreas"
import { useCompany } from "@/features/companies/hooks/useCompany"
import {
  companiesUpdateFormValidator,
  type CompaniesUpdateValidatorType,
} from "@/features/companies/utils/validators/companies"
import { apiFetch } from "@/lib/api"
import type { ReadonlyArrayZod } from "@/types/utils"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

const CompaniesUpdatePage = () => {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const { data: company, isSuccess } = useCompany(id)
  const { data: areas } = useAreas()
  const t = useTranslations("CompaniesUpdatePage")
  const companiesUpdateForm = useForm<CompaniesUpdateValidatorType>({
    disabled: !isSuccess,
    resolver: zodResolver(
      companiesUpdateFormValidator(
        areas?.map((area) => area.value) as unknown as ReadonlyArrayZod,
      ),
    ),
    defaultValues: {
      headquarters: company?.headQuarter,
      areaId: company?.areaId,
      businessName: company?.businessName,
      descriptionCompany: company?.description,
      kbis: company?.kbisUrl,
      logo: company?.logo,
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
          <CustomFormField
            name="areaId"
            form={companiesUpdateForm}
            label={t("area.label")}
            description={t("area.description")}
          >
            {(field) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                name={field.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("area.placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {areas?.map((area) => (
                    <SelectItem value={area.value} key={area.id}>
                      {firstLetterUppercase(area.value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CustomFormField>
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
          <CustomFormTextarea
            form={companiesUpdateForm}
            name="descriptionCompany"
            label={t("descriptionCompany.label")}
            placeholder={t("descriptionCompany.placeholder")}
            description={t("descriptionCompany.description")}
          />
          <Button type="submit">{t("button")}</Button>
        </form>
      </Form>
    </div>
  )
}

export default CompaniesUpdatePage
