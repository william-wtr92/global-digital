import type { SelectMission } from "@/db/schema"

// eslint-disable-next-line complexity
export const calculateDateSincePosted = (
  mission: SelectMission,
  t: (key: string) => string,
) => {
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

export const startDate = (mission: SelectMission) => {
  return new Date(mission.startDate).toLocaleDateString()
}

export const endDate = (mission: SelectMission) => {
  return new Date(mission.endDate).toLocaleDateString()
}
