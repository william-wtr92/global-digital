"use client"

import { useQueryState } from "nuqs"
import { CiLocationOn } from "react-icons/ci"

import { useProfile } from "@/features/account/profil/hooks/useProfile"
import { useAreas } from "@/features/areas/hooks/useAreas"

const LocalisationAndArea = () => {
  const [id] = useQueryState("id")
  const { data: dataProfile } = useProfile(id!)

  const { data: dataAreas } = useAreas()

  if (dataProfile) {
    return (
      dataProfile && (
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-0 md:py-10">
          <div className="flex items-center gap-2 text-xl md:w-full">
            <CiLocationOn className="text-3xl" />
            <p className="text-2xl font-medium">
              {dataProfile.Freelance.localisation}
            </p>
          </div>

          <p className="text-2xl font-medium md:w-full">
            {dataAreas?.find((area) => area.id === dataProfile.Area.id)?.value}
          </p>
        </div>
      )
    )
  }

  return null
}

export default LocalisationAndArea
