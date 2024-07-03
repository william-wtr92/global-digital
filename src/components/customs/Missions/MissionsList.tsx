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

  const calculateMissionTime = (mission: SelectMission) => {
    const startDate = new Date(mission.startDate)
    const endDate = new Date(mission.endDate)
    const diff = endDate.getTime() - startDate.getTime()

    return Math.floor(diff / (1000 * 60 * 60 * 24))
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
              <span>
                {" "}
                {calculateMissionTime(result.Missions)} {t("days")}
              </span>
            </div>
            <div>
              <span className="text-sm">{result.Missions.description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MissionsList
