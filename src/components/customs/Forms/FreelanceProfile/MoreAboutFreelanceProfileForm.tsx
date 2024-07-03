"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import Spinner from "@/components/customs/Utils/Spinner"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
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
import { apiFetch } from "@/lib/api"
import type { Area } from "@/types/area"
import {
  MoreAboutFreelanceSchema,
  type MoreAboutFreelanceType,
} from "@/types/formTypes"
import type { Profile } from "@/types/freelance"
import { capitalizeFirstLetter } from "@/utils/forms"
import routes from "@/web/routes"

type MoreAboutFreelanceProfileFormProps = {
  currentStep: number
  setCurrentStep: Dispatch<SetStateAction<number>>
  profile: Profile
  setProfile: Dispatch<SetStateAction<Profile>>
}

const MoreAboutFreelanceProfileForm = ({
  setCurrentStep,
  profile,
  setProfile,
  currentStep,
}: MoreAboutFreelanceProfileFormProps) => {
  const t = useTranslations("Form")
  const form = useForm<MoreAboutFreelanceType>({
    resolver: zodResolver(MoreAboutFreelanceSchema),
    defaultValues: {
      jobTitle: "",
      businessName: "",
      areaId: undefined,
      localisation: "",
      registrationNumber: "",
      termOfUse: false,
    },
  })

  const onSubmit = (data: MoreAboutFreelanceType) => {
    setProfile({ ...profile, ...data })
    toast.success(t("stepCompleted", { currentStep: currentStep + 1 }))
    setCurrentStep(currentStep + 1)
  }

  const { isPending, data } = useQuery<Area[]>({
    queryKey: ["moreAboutFreelance"],
    queryFn: async () => {
      const response = await apiFetch({
        url: routes.api.areas.index,
      })

      return response.data
    },
  })

  if (isPending) {
    return <Spinner />
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex flex-col gap-5">
          <CustomFormField
            name="jobTitle"
            form={form}
            label={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.jobTitle"),
            )}
            placeholder={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.jobTitle"),
            )}
            description={t("MoreAboutFreelanceProfileForm.description", {
              field: t("MoreAboutFreelanceProfileForm.jobTitle"),
            })}
          />
          <CustomFormField
            name="businessName"
            form={form}
            label={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.businessName"),
            )}
            placeholder={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.businessName"),
            )}
            description={t("MoreAboutFreelanceProfileForm.description", {
              field: t("MoreAboutFreelanceProfileForm.businessName"),
            })}
          />

          <FormField
            control={form.control}
            name="areaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("MoreAboutFreelanceProfileForm.selectActivityArea")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={capitalizeFirstLetter(
                          t("MoreAboutFreelanceProfileForm.activityArea"),
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <CustomFormField
            name="localisation"
            form={form}
            label={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.localisation"),
            )}
            placeholder={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.localisation"),
            )}
            description={t("MoreAboutFreelanceProfileForm.description", {
              field: t("MoreAboutFreelanceProfileForm.localisation"),
            })}
          />

          <CustomFormField
            name="registrationNumber"
            form={form}
            label={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.registrationSiren"),
            )}
            placeholder={capitalizeFirstLetter(
              t("MoreAboutFreelanceProfileForm.registrationSiren"),
            )}
            description={t("MoreAboutFreelanceProfileForm.description", {
              field: t("MoreAboutFreelanceProfileForm.registrationNumber"),
            })}
          />

          <FormField
            control={form.control}
            name="termOfUse"
            render={({ field }) => (
              <FormItem className="my-4 flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    {t("MoreAboutFreelanceProfileForm.acceptTermOfUse")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          {t("MoreAboutFreelanceProfileForm.submit")}
        </Button>
      </form>
    </Form>
  )
}

export default MoreAboutFreelanceProfileForm
