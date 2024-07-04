"use client"

import {
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  MapPinIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { toast } from "sonner"

import Spinner from "@/components/customs/Utils/Spinner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { SC } from "@/def/status"
import { apiFetch } from "@/lib/api"
import { MissionOperating } from "@/types"
import { endDate, startDate } from "@/utils/date"
import { getFullName } from "@/utils/functions"
import { firstLetterUppercase } from "@/utils/string"
import useAppContext from "@/web/hooks/useAppContext"
import { useCandidate } from "@/web/hooks/useCandidate"
import { useCandidates } from "@/web/hooks/useCandidates"
import { useMission } from "@/web/hooks/useMission"
import routes from "@/web/routes"

// eslint-disable-next-line complexity
const DetailMissionPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const t = useTranslations("Missions")

  const [id] = useQueryState("id")

  const { userInfo } = useAppContext()

  const {
    data: missionData,
    isLoading: missionLoading,
    isError: missionError,
  } = useMission(id || "")
  const resultMission =
    !missionLoading && !missionError ? missionData?.detailedMission : null
  const detailedMission = resultMission?.Missions
  const detailedCompany = resultMission?.Company

  const {
    data: candidateData,
    isLoading: candidateLoading,
    isError: candidateError,
  } = useCandidate(id || "")
  const resultCandidate =
    !candidateLoading && !candidateError
      ? candidateData?.isUserAlreadyCandidate
      : null

  const {
    data: candidatesData,
    isLoading: candidatesLoading,
    isError: candidatesError,
  } = useCandidates(id || "")
  const resultCandidates =
    !candidatesLoading && !candidatesError ? candidatesData?.candidates : null

  const candidateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiFetch({
        url: resultCandidate
          ? routes.api.missions.candidate.delete(id!)
          : routes.api.missions.candidate.send(id!),
        method: resultCandidate ? "DELETE" : "POST",
        data: {},
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

  const handleCandidate = () => {
    candidateMutation.mutate()
  }

  const handleDeleteCandidate = (candidateId: string) => {
    deleteCandidateMutation.mutate(candidateId)
  }

  const renderContent = () => {
    if (!resultMission?.isEmployee) {
      if (resultCandidate) {
        return (
          <AlertDialog>
            <AlertDialogTrigger>
              <Button className="relative left-6 w-80 bg-destructive xl:left-0">
                {t("Candidate.alert.trigger")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("Candidate.alert.title")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t("Candidate.alert.content")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {t("Candidate.alert.cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCandidate}
                  className="bg-destructive"
                >
                  {t("Candidate.alert.delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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

        {resultCandidates?.map((candidate) => (
          <div
            key={candidate.Candidate.id}
            className="mt-4 flex items-center justify-center gap-14"
          >
            <UserIcon className="size-8" />
            <Link
              href={routes.freelance.profile(
                getFullName(
                  candidate.Users.firstName,
                  candidate.Users.lastName,
                ),
                userInfo.id,
              )}
              className="font-semibold"
            >
              <span>
                {candidate.Users.firstName} {candidate.Users.lastName}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <ChatBubbleLeftIcon className="size-8 cursor-pointer" />
              <XMarkIcon
                className="size-8 cursor-pointer text-destructive"
                onClick={() => handleDeleteCandidate(candidate.Candidate.id)}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!id) {
    router.push(routes.missions.search)

    return null
  }

  if (missionLoading || candidateLoading || candidatesLoading) {
    return <Spinner />
  }

  return (
    <div className="relative flex h-[70vh] items-center justify-center px-6 py-10 xl:px-0">
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
                {startDate(detailedMission)} {t("to")}{" "}
                {endDate(detailedMission)}
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
