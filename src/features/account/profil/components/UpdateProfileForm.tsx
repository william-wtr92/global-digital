"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { MdAddReaction } from "react-icons/md"
import { toast } from "sonner"

import { CustomFormInput } from "@/components/forms/CustomFormInput"
import { Loading } from "@/components/layout/Loading"
import { Button } from "@/components/ui/button"
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
import DeleteAccountDialog from "@/features/account/components/DeleteAccountDialog"
import type { ApiProfile } from "@/features/account/profil/types/api/profile"
import { useAreas } from "@/features/areas/hooks/useAreas"
import {
  updateAccountFreelanceSchema,
  type UpdateAccountFreelanceType,
} from "@/features/auth/registration/utils/validators/form"
import type { Profile } from "@/features/freelance/types/freelance"
import { apiFetch } from "@/lib/api"
import { getFullNameLowerCase } from "@/utils/functions"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

type UpdateProfilFormProps = {
  profile: ApiProfile
}

const UpdateProfilForm = ({ profile }: UpdateProfilFormProps) => {
  const [id] = useQueryState("id")
  const [updatedProfile, setUpdatedProfile] = useState<Profile>()
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()

  const form = useForm<UpdateAccountFreelanceType>({
    resolver: zodResolver(updateAccountFreelanceSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      phoneNumber: "",
      jobTitle: "",
      businessName: "",
      areaId: undefined,
      localisation: "",
      registrationNumber: "",
    },
  })

  useEffect(() => {
    if (profile) {
      form.reset({
        lastName: profile.Users.lastName,
        firstName: profile.Users.firstName,
        email: profile.Users.email,
        phoneNumber: profile.Users.phoneNumber,
        jobTitle: profile.Freelance.jobTitle,
        businessName: profile.Freelance.businessName,
        areaId: profile.Freelance.areaId,
        localisation: profile.Freelance.localisation,
        registrationNumber: profile.Freelance.registrationNumber,
      })
    }
  }, [profile, form])

  const { data, error, isPending } = useAreas()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await apiFetch<Profile>({
        url: routes.api.freelance.updateAccount(id || ""),
        method: "PATCH",
        data: updatedProfile,
      })

      if (response.data.error) {
        if (response.data.error.constraint === "Users_email_unique") {
          toast.error(t("Error.email_unique"))
        } else {
          toast.error(t("Error.anErrorOccurred"))
        }
      } else {
        queryClient.invalidateQueries({
          queryKey: ["freelanceUpdateProfile", id],
        })
        queryClient.invalidateQueries({
          queryKey: ["freelanceProfile"],
        })
        queryClient.invalidateQueries({
          queryKey: ["areaMoreAboutFreelance"],
        })
        toast.success(t("Success.updtaedSuccess"))

        if (profile.Users && id) {
          router.push(
            routes.freelance.profile(
              getFullNameLowerCase(
                profile.Users.firstName,
                profile.Users.lastName,
              ).toLowerCase(),
              id,
            ),
          )
        }
      }
    },
    onError: () => {
      toast.error(t("Error.anErrorOccurred"))
    },
  })

  const onSubmit = (data: UpdateAccountFreelanceType) => {
    setUpdatedProfile(data)

    mutation.mutate()
  }

  if (isPending) {
    return <Loading />
  }

  if (error) {
    toast.error(t("Error.anErrorOccurred"))
    router.push(routes.home)

    return null
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="flex cursor-pointer flex-col gap-5 rounded-full bg-gray-300 p-10">
        <MdAddReaction className="text-9xl" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6"
        >
          <div className="mb-5 flex flex-col gap-5">
            <CustomFormInput
              name="lastName"
              form={form}
              label={firstLetterUppercase(t("Form.UpdateProfilForm.lastName"))}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.lastName"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.lastName"),
              })}
            />

            <CustomFormInput
              name="firstName"
              form={form}
              label={firstLetterUppercase(t("Form.UpdateProfilForm.firstName"))}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.firstName"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.firstName"),
              })}
            />

            <CustomFormInput
              name="email"
              form={form}
              label={firstLetterUppercase(t("Form.UpdateProfilForm.email"))}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.email"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.email"),
              })}
            />

            <CustomFormInput
              name="phoneNumber"
              form={form}
              label={firstLetterUppercase(
                t("Form.UpdateProfilForm.phoneNumber"),
              )}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.phoneNumber"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.phoneNumber"),
              })}
            />

            <CustomFormInput
              name="businessName"
              form={form}
              label={firstLetterUppercase(
                t("Form.UpdateProfilForm.businessName"),
              )}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.businessName"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.businessName"),
              })}
            />

            <CustomFormInput
              name="jobTitle"
              form={form}
              label={firstLetterUppercase(t("Form.UpdateProfilForm.jobTitle"))}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.jobTitle"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.jobTitle"),
              })}
            />

            <FormField
              control={form.control}
              name="areaId"
              render={({ field }) => (
                <FormItem className="w-screen max-w-96 px-4">
                  <FormLabel>
                    {t("Form.UpdateProfilForm.selectActivityArea")}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={profile.Freelance.areaId}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={firstLetterUppercase(
                            t("Form.UpdateProfilForm.activityArea"),
                          )}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data.map((area) => (
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
                t("Form.UpdateProfilForm.localisation"),
              )}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.localisation"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.localisation"),
              })}
            />

            <CustomFormInput
              name="registrationNumber"
              form={form}
              label={firstLetterUppercase(
                t("Form.UpdateProfilForm.registrationSiren"),
              )}
              placeholder={firstLetterUppercase(
                t("Form.UpdateProfilForm.registrationSiren"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.registrationNumber"),
              })}
            />
          </div>
          <Button type="submit">{t("Form.UpdateProfilForm.submit")}</Button>
        </form>
      </Form>

      <DeleteAccountDialog id={profile.Users.id} />
    </div>
  )
}

export default UpdateProfilForm
