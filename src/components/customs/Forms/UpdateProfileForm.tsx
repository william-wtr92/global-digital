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

import CustomFormField from "@/components/customs/Forms/CustomFormField"
import DeleteAccountDialog from "@/components/customs/Forms/DeleteAccountDialog"
import Spinner from "@/components/customs/Utils/Spinner"
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
import { apiFetch } from "@/lib/api"
import type { ProfileApi } from "@/types/api/profile"
import {
  UpdateAccountFreelanceSchema,
  type UpdateAccountFreelanceType,
} from "@/types/formTypes"
import type { Profile } from "@/types/freelance"
import { capitalizeFirstLetter } from "@/utils/forms"
import { getFullName } from "@/utils/functions"
import { useArea } from "@/web/hooks/useArea"
import routes from "@/web/routes"

type UpdateProfilFormProps = {
  profile: ProfileApi
}

const UpdateProfilForm = ({ profile }: UpdateProfilFormProps) => {
  const [id] = useQueryState("id")
  const [updatedProfile, setUpdatedProfile] = useState<Profile>()
  const router = useRouter()
  const t = useTranslations()
  const queryClient = useQueryClient()

  const form = useForm<UpdateAccountFreelanceType>({
    resolver: zodResolver(UpdateAccountFreelanceSchema),
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

  const { data, error, isPending } = useArea()

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
              getFullName(
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
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    )
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
            <CustomFormField
              name="lastName"
              form={form}
              label={capitalizeFirstLetter(t("Form.UpdateProfilForm.lastName"))}
              placeholder={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.lastName"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.lastName"),
              })}
            />

            <CustomFormField
              name="firstName"
              form={form}
              label={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.firstName"),
              )}
              placeholder={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.firstName"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.firstName"),
              })}
            />

            <CustomFormField
              name="email"
              form={form}
              label={capitalizeFirstLetter(t("Form.UpdateProfilForm.email"))}
              placeholder={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.email"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.email"),
              })}
            />

            <CustomFormField
              name="phoneNumber"
              form={form}
              label={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.phoneNumber"),
              )}
              placeholder={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.phoneNumber"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.phoneNumber"),
              })}
            />

            <CustomFormField
              name="businessName"
              form={form}
              label={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.businessName"),
              )}
              placeholder={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.businessName"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.businessName"),
              })}
            />

            <CustomFormField
              name="jobTitle"
              form={form}
              label={capitalizeFirstLetter(t("Form.UpdateProfilForm.jobTitle"))}
              placeholder={capitalizeFirstLetter(
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
                          placeholder={capitalizeFirstLetter(
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

            <CustomFormField
              name="localisation"
              form={form}
              label={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.localisation"),
              )}
              placeholder={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.localisation"),
              )}
              description={t("Form.UpdateProfilForm.description", {
                field: t("Form.UpdateProfilForm.localisation"),
              })}
            />

            <CustomFormField
              name="registrationNumber"
              form={form}
              label={capitalizeFirstLetter(
                t("Form.UpdateProfilForm.registrationSiren"),
              )}
              placeholder={capitalizeFirstLetter(
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
