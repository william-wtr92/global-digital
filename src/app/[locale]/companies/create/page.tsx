"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { CustomFormField } from "@/components/forms/CustomFormField"
import { CustomFormInput } from "@/components/forms/CustomFormInput"
import { CustomFormTextarea } from "@/components/forms/CustomFormTextarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAreas } from "@/features/areas/hooks/useAreas"
import {
  companiesCreateFormValidator,
  type CompaniesCreateValidatorType,
} from "@/features/companies/utils/validators/companies"
import { apiFetch } from "@/lib/api"
import type { ReadonlyArrayZod } from "@/types/utils"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

const CompaniesCreatePage = () => {
  const { data: areas } = useAreas()
  const t = useTranslations("CompaniesCreatePage")
  const companiesCreateForm = useForm<CompaniesCreateValidatorType>({
    resolver: zodResolver(
      companiesCreateFormValidator(
        areas?.map((area) => area.value) as unknown as ReadonlyArrayZod,
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
          <CustomFormField
            form={companiesCreateForm}
            label={t("area.label")}
            description={t("area.description")}
            name="areaId"
          >
            {(field) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value as string}
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
          <CustomFormField
            form={companiesCreateForm}
            label={t("accept.label")}
            name="accept"
          >
            {(field) => (
              <Checkbox
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
            )}
          </CustomFormField>

          <Button type="submit">{t("button")}</Button>
        </form>
      </Form>
    </div>
  )
}

export default CompaniesCreatePage
