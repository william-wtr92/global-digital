import { useFormatter, useTranslations } from "next-intl"
import Link from "next/link"

import Spinner from "@/components/utils/Spinner"
import { useMissions } from "@/features/missions/hooks/useMissions"
import { calculateDateSincePosted } from "@/utils/date"
import routes from "@/utils/routes"

type Props = {
  searchQuery: string
}

const MissionsList = ({ searchQuery }: Props) => {
  const t = useTranslations("Missions")
  const formatter = useFormatter()
  const { data, isLoading, error } = useMissions()
  const results = !isLoading && !error ? data?.searchResults : []

  const filteredResults = results?.filter((result) => {
    const missionTitle = result.Missions.title.toLowerCase()
    const companyName = result.Company.businessName.toLowerCase()
    const query = searchQuery.toLowerCase()

    return missionTitle.includes(query) || companyName.includes(query)
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="flex h-full w-full flex-col gap-10 overflow-y-auto scroll-auto px-2 py-10 xl:w-1/2 xl:px-0 xl:py-0">
      {filteredResults?.map((result) => (
        <Link
          key={result.Missions.id}
          href={routes.missions.detailedMission(result.Missions.id)}
        >
          <div className="flex items-center gap-8">
            <div className="rounded-md border-2 px-6 py-4">
              <span>{result.Company.businessName[0].toUpperCase()}</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-xl font-bold">
                <span>{result.Missions.title} -</span>
                <span> {result.Company.businessName} -</span>
                <span>
                  {" "}
                  {formatter.dateTime(new Date(result.Missions.startDate), {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  {t("to")}{" "}
                  {formatter.dateTime(new Date(result.Missions.endDate), {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  {" "}
                  {t("since")} {calculateDateSincePosted(result.Missions, t)}{" "}
                </span>
                <span className="break-all text-sm">
                  {result.Missions.description}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MissionsList
