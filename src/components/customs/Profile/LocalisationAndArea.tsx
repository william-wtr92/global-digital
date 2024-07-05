"use client"

import { CiLocationOn } from "react-icons/ci"

import type { ProfileApi } from "@/types/api/profile"

type LocalisationAndAreaProps = {
  data: ProfileApi
}

const LocalisationAndArea = ({ data }: LocalisationAndAreaProps) => {
  if (data.Freelance) {
    return (
      <>
        {data.Freelance && (
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-0 md:py-10">
            <div className="flex items-center gap-2 text-xl md:w-full">
              <CiLocationOn className="text-3xl" />
              <p className="text-2xl font-medium">
                {data.Freelance.localisation}
              </p>
            </div>

            <p className="text-2xl font-medium md:w-full">{data.Area.value}</p>
          </div>
        )}
      </>
    )
  }

  return null
}

export default LocalisationAndArea
