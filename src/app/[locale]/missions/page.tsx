"use client"

import {
  CreditCardIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { CheckIcon } from "@radix-ui/react-icons"
import { loadStripe } from "@stripe/stripe-js"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormatter, useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { toast } from "sonner"

import { Loading } from "@/components/layout/Loading"
import { Button } from "@/components/ui/button"
import CustomAlertDialog from "@/components/utils/CustomAlertDialog"
import { useCandidate } from "@/features/missions/candidate/hooks/useCandidate"
import { useCandidates } from "@/features/missions/candidate/hooks/useCandidates"
import { useMission } from "@/features/missions/hooks/useMission"
import {
  MissionOperating,
  MissionStatus,
} from "@/features/missions/types/missions"
import { apiFetch } from "@/lib/api"
import { SC } from "@/utils/constants/status"
import { getFullName } from "@/utils/functions"
import routes from "@/utils/routes"
import { firstLetterUppercase } from "@/utils/string"

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

if (!stripePublicKey) {
  throw new Error("Missing Stripe public key")
}

const stripePromise = loadStripe(stripePublicKey)

// eslint-disable-next-line complexity
const DetailMissionPage = () => {
  const router = useRouter()
  const formatter = useFormatter()
  const queryClient = useQueryClient()
  const t = useTranslations("Missions")
  const [id] = useQueryState("id")

  const [openDelete, setDeleteOpen] = useState<boolean>(false)
  const [openAccept, setAcceptOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const {
    data: missionData,
    isLoading: missionLoading,
    isError: missionError,
  } = useMission(id!)
  const resultMission =
    !missionLoading && !missionError ? missionData?.detailedMission : null
  const detailedMission = resultMission?.Missions
  const detailedCompany = resultMission?.Company
  const missionPrice = resultMission ? resultMission.Missions.price : 0

  const {
    data: candidateData,
    isLoading: candidateLoading,
    isError: candidateError,
  } = useCandidate(id!)
  const resultCandidate =
    !candidateLoading && !candidateError
      ? candidateData?.isUserAlreadyCandidate
      : null

  const {
    data: candidatesData,
    isLoading: candidatesLoading,
    isError: candidatesError,
  } = useCandidates(id!)
  const resultCandidates =
    !candidatesLoading && !candidatesError ? candidatesData?.candidates : null

  const candidateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiFetch({
        url: resultCandidate
          ? routes.api.missions.candidate.delete(id!)
          : routes.api.missions.candidate.send(id!),
        method: resultCandidate ? "DELETE" : "POST",
        credentials: "include",
      })

      if (response.status !== SC.success.OK) {
        resultCandidate
          ? toast.error(t("Candidate.messages.deleteError"))
          : toast.error(t("Candidate.messages.sentError"))

        return
      }

      resultCandidate
        ? toast.success(t("Candidate.messages.deleteSuccess"))
        : toast.success(t("Candidate.messages.sentSuccess"))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["candidate"] })
    },
  })

  const deleteCandidateMutation = useMutation({
    mutationFn: async (candidateId: string) => {
      const response = await apiFetch({
        url: routes.api.missions.candidate.deleteByEmployee(id!, candidateId),
        method: "DELETE",
        data: {},
        credentials: "include",
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("Candidate.messages.employeeDeleteError"))

        return
      }

      toast.success(t("Candidate.messages.employeeDeleteSuccess"))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["candidates"] })
    },
  })

  const acceptCandidateMutation = useMutation({
    mutationFn: async (candidateId: string) => {
      const response = await apiFetch({
        url: routes.api.missions.candidate.acceptedByEmployee(id!, candidateId),
        method: "PATCH",
        data: {},
        credentials: "include",
      })

      if (response.status !== SC.success.OK) {
        toast.error(t("Candidate.messages.employeeAcceptError"))

        return
      }

      toast.success(t("Candidate.messages.employeeAcceptSuccess"))
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["mission", id],
      })
    },
  })

  const paymentMutation = useMutation({
    mutationFn: async ({
      price,
      targetedUserId,
    }: {
      price: number
      targetedUserId: string
    }) => {
      const response = await apiFetch({
        url: routes.api.missions.payment(id!),
        method: "POST",
        data: { price, targetedUserId },
      })

      if (response.status !== SC.success.CREATED) {
        toast.error(t("Candidate.payment.error"))
      }

      const session = await response.data

      const stripe = await stripePromise
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      })

      if (result?.error) {
        toast.error(t("Candidate.payment.error"))
      }
    },
    onSuccess: async () => {
      setLoading(false)
      await queryClient.invalidateQueries({
        queryKey: ["mission", id],
      })
    },
  })

  const handleCheckout = (targetedUserId: string) => {
    setLoading(true)
    paymentMutation.mutate({
      price: missionPrice * 100,
      targetedUserId,
    })
  }

  const handleCandidate = () => {
    candidateMutation.mutate()
  }

  const handleTriggerAcceptAlert = () => {
    setAcceptOpen((prev) => !prev)
  }

  const handleTriggerDeleteAlert = () => {
    setDeleteOpen((prev) => !prev)
  }

  const handleDeleteCandidate = (candidateId: string) => {
    deleteCandidateMutation.mutate(candidateId)
  }

  const handleAcceptCandidate = (candidateId: string) => {
    acceptCandidateMutation.mutate(candidateId)
  }

  const renderContent = () => {
    if (
      !resultMission?.isEmployee &&
      resultMission?.Missions.status === MissionStatus.pending
    ) {
      if (resultCandidate) {
        return (
          <CustomAlertDialog
            variant={"destructive"}
            trigger={t("Candidate.alerts.cancel.trigger")}
            title={t("Candidate.alerts.cancel.title")}
            content={t("Candidate.alerts.cancel.content")}
            cancel={t("Candidate.alerts.cancel.cancel")}
            confirm={t("Candidate.alerts.cancel.confirm")}
            onSubmit={handleCandidate}
            withTrigger={true}
          />
        )
      }

      return (
        <div className="fixed bottom-10 left-auto flex w-full xl:relative xl:bottom-0 xl:justify-center">
          <Button
            className="relative left-6 w-80 xl:left-0"
            onClick={handleCandidate}
          >
            {t("Candidate.apply")}
          </Button>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-center text-2xl font-extrabold underline underline-offset-4">
          {t("Candidate.titles.candidates")}
        </h1>

        {resultCandidates?.length === 0 && (
          <div className="text-center">
            <span className="font-bold">{t("Candidate.noCandidates")}</span>
          </div>
        )}

        <div className="h-80 overflow-y-auto p-4 xl:h-96">
          {resultCandidates?.map((candidate) => (
            <div
              key={candidate.Candidate.id}
              className={`mt-4 flex items-center ${resultMission?.Missions.status === MissionStatus.pending ? "justify-between" : "justify-center"} gap-14`}
            >
              <UserIcon className="size-8" />
              <Link
                href={routes.freelance.profile(
                  getFullName(candidate.Users),
                  candidate.Users.id,
                )}
                className="font-semibold"
              >
                <span>
                  {candidate.Users.firstName} {candidate.Users.lastName}
                </span>
              </Link>
              {resultMission?.Missions.status === MissionStatus.pending && (
                <div className="flex items-center gap-3">
                  <CheckIcon
                    className="size-8 cursor-pointer text-green-500 hover:scale-105"
                    onClick={handleTriggerAcceptAlert}
                  />
                  <XMarkIcon
                    className="size-8 cursor-pointer text-destructive hover:scale-105"
                    onClick={handleTriggerDeleteAlert}
                  />
                  <CustomAlertDialog
                    variant={"destructive"}
                    open={openDelete}
                    close={handleTriggerDeleteAlert}
                    title={t("Candidate.alerts.delete.title")}
                    content={t("Candidate.alerts.delete.content")}
                    cancel={t("Candidate.alerts.delete.cancel")}
                    confirm={t("Candidate.alerts.delete.confirm")}
                    onSubmit={() =>
                      handleDeleteCandidate(candidate.Candidate.id)
                    }
                  />
                  <CustomAlertDialog
                    variant={"success"}
                    open={openAccept}
                    close={handleTriggerAcceptAlert}
                    title={t("Candidate.alerts.accept.title")}
                    content={t("Candidate.alerts.accept.content")}
                    cancel={t("Candidate.alerts.accept.cancel")}
                    confirm={t("Candidate.alerts.accept.confirm")}
                    onSubmit={() => {
                      handleAcceptCandidate(candidate.Candidate.id)
                      handleTriggerAcceptAlert()
                    }}
                  />
                </div>
              )}
              {resultMission?.Missions.status === MissionStatus.inProgress &&
                resultMission?.isEmployee && (
                  <Button
                    onClick={() => handleCheckout(candidate.Users.id)}
                    disabled={loading}
                    className="flex items-center gap-3"
                  >
                    <CreditCardIcon className="size-8" />
                  </Button>
                )}

              {resultMission?.Missions.status === MissionStatus.completed && (
                <span className="rounded-md bg-green-400 px-2 font-bold text-white">
                  {t("Candidate.completed")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!id) {
    router.push(routes.missions.search)

    return null
  }

  if (missionLoading || candidateLoading || candidatesLoading) {
    return <Loading />
  }

  return (
    <div className="relative flex h-screen items-center justify-center px-6 py-10 xl:px-0">
      {detailedMission && missionData?.detailedMission.isEmployee && (
        <div className="absolute left-8 top-8">
          <Link href={routes.missions.updateMission(detailedMission.id)}>
            <PencilSquareIcon className="size-8 cursor-pointer" />
          </Link>
        </div>
      )}
      {detailedMission && detailedCompany && (
        <div className="mt-20 flex flex-col gap-8">
          <h1 className="text-center text-4xl font-extrabold">
            {detailedMission.title}
          </h1>

          <div className="flex items-center justify-center gap-20">
            <div className="rounded-md border-2 px-6 py-4">
              <span>{detailedCompany.businessName[0].toUpperCase()}</span>
            </div>
            <div className="flex flex-col items-center gap-3 xl:flex-row">
              <span>{t("duration")}</span>
              <span className="font-semibold">
                {formatter.dateTime(
                  new Date(resultMission.Missions.startDate),
                  {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  },
                )}{" "}
                {t("to")}{" "}
                {formatter.dateTime(new Date(resultMission.Missions.endDate), {
                  year: "2-digit",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex items-center justify-center gap-20">
              <div className="flex items-center gap-3 text-xl font-bold">
                <GlobeAltIcon className="size-6" />
                <span>{firstLetterUppercase(detailedMission.operating)}</span>
              </div>
              {detailedMission.operating !== MissionOperating.homeWorking && (
                <div className="flex items-center gap-3 text-xl font-bold">
                  <MapPinIcon className="size-6" />
                  <span>{detailedMission.localisation}</span>
                </div>
              )}
            </div>
            <p className="mx-auto w-full break-all text-center xl:w-1/2">
              {detailedMission.description}
            </p>
          </div>

          {renderContent()}
        </div>
      )}
    </div>
  )
}

export default DetailMissionPage
