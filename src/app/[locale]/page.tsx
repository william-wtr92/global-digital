"use client"

import { useTranslations } from "next-intl"

import { Loading } from "@/components/layout/Loading"
import ImageTitle from "@/features/home/components/ImageTitle"
import SearchInput from "@/features/home/components/SearchInput"
import SubTitleItem from "@/features/home/components/SubTitleItem"
import { useHome } from "@/features/home/hooks/useHome"
import { useAppContext } from "@/hooks/useAppContext"

const IndexPage = () => {
  const { userInfo } = useAppContext()
  const { data, isPending, error } = useHome()
  const t = useTranslations()

  if (isPending) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-xl">
        {t("Error.anErrorOccurred")}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 text-blueText">
      <div className="flex flex-col items-center">
        <h1 className="w-72 text-center text-2xl font-bold md:w-96">
          {t("Home.title")}
        </h1>

        <div className="mt-14 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-32">
          <SubTitleItem
            number={data.total.missionCount}
            title={t("Home.publishedMission")}
          />
          <SubTitleItem
            number={data.total.freelanceCount}
            title={t("Home.freelanceAvailable")}
          />
          <SubTitleItem
            number={data.total.companyCount}
            title={t("Home.subscribedCompanies")}
          />
        </div>

        {userInfo.id && <SearchInput />}
        {!userInfo.id && <div className="mt-20 w-72 bg-darkBlue py-0.5"></div>}

        <div className="mx-3 mt-16 flex flex-col items-center justify-center gap-10">
          <ImageTitle
            img="home_page_1.jpeg"
            title={t("Home.projectDeserveBest")}
          />
          <ImageTitle
            img="home_page_2.jpeg"
            className="md:flex-row-reverse"
            titleClassName="md:text-right"
            divTitleClassName="md:justify-end"
            title={t("Home.rightYourContract")}
          />
          <ImageTitle
            img="home_page_3.jpeg"
            title={t("Home.collaborativeSpace")}
          />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
