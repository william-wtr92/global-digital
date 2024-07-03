import { useTranslations } from "next-intl"

import Spinner from "@/components/customs/Utils/Spinner"
import type { SelectMission } from "@/db/schema"
import { useMissions } from "@/web/hooks/useMissions"

type Props = {
  searchQuery: string
}

const MissionsList = ({ searchQuery }: Props) => {
  const t = useTranslations("Missions")

  const { data, isLoading, error } = useMissions()
  const results = !isLoading && !error ? data?.searchResults : []

  const filteredResults = results?.filter((result) => {
    const missionTitle = result.Missions.title.toLowerCase()
    const companyName = result.Company.businessName.toLowerCase()
    const query = searchQuery.toLowerCase()

    return missionTitle.includes(query) || companyName.includes(query)
  })

  // eslint-disable-next-line complexity
  const calculateDateSincePosted = (mission: SelectMission) => {
    const createDate = new Date(mission.createdAt)
    const currentDate = new Date()

    const timeDifference = createDate.getTime() - currentDate.getTime()
    const minutesDifference = timeDifference / (1000 * 60)
    const hoursDifference = timeDifference / (1000 * 3600)
    const daysDifference = timeDifference / (1000 * 3600 * 24)

    if (daysDifference >= 365) {
      const years = Math.floor(daysDifference / 365)

      return `${years} ${years > 1 ? t("years") : t("year")}`
    } else if (daysDifference >= 30) {
      const months = Math.floor(daysDifference / 30)

      return `${months} ${months > 1 ? t("months") : t("month")}`
    } else if (daysDifference >= 1) {
      const days = Math.floor(daysDifference)

      return `${days} ${days > 1 ? t("days") : t("day")}`
    } else if (hoursDifference >= 1) {
      const hours = Math.floor(hoursDifference)

      return `${hours} ${hours > 1 ? t("hours") : t("hour")}`
    }

    const minutes = Math.floor(minutesDifference)

    return `${minutes} ${minutes > 1 ? t("minutes") : t("minute")}`
  }

  const startDate = (mission: SelectMission) => {
    return new Date(mission.startDate).toLocaleDateString()
  }

  const endDate = (mission: SelectMission) => {
    return new Date(mission.endDate).toLocaleDateString()
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex h-full w-full flex-col gap-10 overflow-y-auto scroll-auto px-2 py-10 xl:w-1/2 xl:px-0 xl:py-0">
      {filteredResults?.map((result) => (
        <div key={result.Missions.id} className="flex items-center gap-8">
          <div className="rounded-md border-2 px-6 py-4">
            <span>{result.Company.businessName[0].toUpperCase()}</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xl font-bold">
              <span>{result.Missions.title} -</span>
              <span> {result.Company.businessName} -</span>
              <span>
                {" "}
                {startDate(result.Missions)} {t("to")}{" "}
                {endDate(result.Missions)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm">
                {" "}
                {t("since")} {calculateDateSincePosted(result.Missions)}{" "}
              </span>
              <span className="text-sm">{result.Missions.description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MissionsList
