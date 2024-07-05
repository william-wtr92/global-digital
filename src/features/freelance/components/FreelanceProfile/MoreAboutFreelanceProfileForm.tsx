"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import type { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { CustomFormInput } from "@/components/forms/CustomFormInput"
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
import Spinner from "@/components/utils/Spinner"
import type { Area } from "@/features/areas/types/area"
import {
  moreAboutFreelanceSchema,
  type MoreAboutFreelanceType,
} from "@/features/auth/registration/utils/validators/form"
import type { Profile } from "@/features/freelance/types/freelance"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

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
    resolver: zodResolver(moreAboutFreelanceSchema),
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
          <CustomFormInput
            name="jobTitle"
            form={form}
            label={firstLetterUppercase(
              t("MoreAboutFreelanceProfileForm.jobTitle"),
            )}
            placeholder={firstLetterUppercase(
              t("MoreAboutFreelanceProfileForm.jobTitle"),
            )}
            description={t("MoreAboutFreelanceProfileForm.description", {
              field: t("MoreAboutFreelanceProfileForm.jobTitle"),
            })}
          />
          <CustomFormInput
            name="businessName"
            form={form}
            label={firstLetterUppercase(
              t("MoreAboutFreelanceProfileForm.businessName"),
            )}
            placeholder={firstLetterUppercase(
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
              <FormItem className="w-screen max-w-96 px-4">
                <FormLabel>
                  {t("MoreAboutFreelanceProfileForm.selectActivityArea")}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="border">
                    <SelectTrigger>
                      <SelectValue
                        placeholder={firstLetterUppercase(
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

          <CustomFormInput
            name="localisation"
            form={form}
            label={firstLetterUppercase(
              t("MoreAboutFreelanceProfileForm.localisation"),
            )}
            placeholder={firstLetterUppercase(
              t("MoreAboutFreelanceProfileForm.localisation"),
            )}
            description={t("MoreAboutFreelanceProfileForm.description", {
              field: t("MoreAboutFreelanceProfileForm.localisation"),
            })}
          />

          <CustomFormInput
            name="registrationNumber"
            form={form}
            label={firstLetterUppercase(
              t("MoreAboutFreelanceProfileForm.registrationSiren"),
            )}
            placeholder={firstLetterUppercase(
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
              <FormItem className="my-4 flex w-screen max-w-96 flex-row items-start space-x-3 space-y-0 rounded-md px-4">
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
