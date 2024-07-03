import { eq } from "drizzle-orm"
import { type JwtPayload, verify } from "jsonwebtoken"
import { type NextRequest, NextResponse } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { company, employee, mission, users } from "@/db/schema"
import { SC } from "@/def/status"

export const GET = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
  const cookies = req.cookies
  const jwt = cookies.get("Authorization")?.value

  if (!jwt) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: SC.errors.UNAUTHORIZED },
    )
  }

  try {
    const decoded = await verify(jwt, appConfig.security.jwt.secret)

    if (!decoded || typeof decoded === "string") {
      return NextResponse.json(
        { message: "Failed to check your token" },
        { status: SC.errors.UNAUTHORIZED },
      )
    }

    const {
      payload: {
        user: { id },
      },
    } = decoded as JwtPayload

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .leftJoin(employee, eq(employee.userId, users.id))

    const detailedMission = await db
      .select()
      .from(mission)
      .where(eq(mission.id, missionId))
      .leftJoin(company, eq(company.id, mission.companyId))

    const isEmployee =
      user[0]?.Employee?.companyId === detailedMission[0].Missions.companyId

    return NextResponse.json(
      { result: true, detailedMission: { ...detailedMission[0], isEmployee } },
      { status: SC.success.OK },
    )
  } catch (e) {
    return NextResponse.json(
      { isError: true, message: "Error occurred during fetching of mission" },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const PATCH = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
  const { title, startDate, endDate, description, operating, localisation } =
    await req.json()

  if (missionId === null || "") {
    return NextResponse.json(
      { isError: true, message: "No missionId provided" },
      { status: SC.errors.BAD_REQUEST },
    )
  }

  try {
    await db
      .update(mission)
      .set({
        title,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        description,
        operating,
        localisation,
      })
      .where(eq(mission.id, missionId))

    return NextResponse.json({ result: true }, { status: SC.success.OK })
  } catch (e) {
    return NextResponse.json(
      { isError: true, message: "Error occurred during update of mission." },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
