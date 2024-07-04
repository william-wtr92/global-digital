import { desc, like, and, eq } from "drizzle-orm"
import { type JwtPayload, verify } from "jsonwebtoken"
import { type NextRequest } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import {
  type InsertMission,
  company,
  employee,
  mission,
  users,
} from "@/db/schema"
import { SC } from "@/utils/constants/status"

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const searchQuery = url.searchParams.get("search") || ""

  try {
    const searchResults = await db
      .select()
      .from(mission)
      .leftJoin(company, eq(mission.companyId, company.id))
      .where(
        and(
          like(mission.title, `%${searchQuery}%`),
          like(company.businessName, `%${searchQuery}%`),
          eq(mission.status, "pending"),
        ),
      )
      .orderBy(desc(mission.createdAt))

    return Response.json(
      { result: true, searchResults },
      { status: SC.success.OK },
    )
  } catch (e) {
    return Response.json(
      { error: e },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const POST = async (req: NextRequest) => {
  const {
    title,
    startDate,
    endDate,
    description,
    operating,
    localisation,
    price,
  } = await req.json()

  const cookies = req.cookies
  const jwt = cookies.get("Authorization")?.value

  if (!jwt) {
    return Response.json(
      { message: "No token provided" },
      { status: SC.errors.UNAUTHORIZED },
    )
  }

  try {
    const decoded = await verify(jwt, appConfig.security.jwt.secret)

    if (!decoded || typeof decoded === "string") {
      return Response.json(
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
      .leftJoin(employee, eq(users.id, employee.userId))

    if (!user) {
      return Response.json(
        { message: "User is not an employee" },
        { status: SC.errors.NOT_FOUND },
      )
    }

    const companyId = user[0]?.Employee?.companyId

    if (!companyId) {
      return Response.json(
        { message: "User is not associated with a company" },
        { status: SC.errors.NOT_FOUND },
      )
    }

    const missionData: InsertMission = {
      companyId,
      status: "pending",
      title,
      description,
      operating,
      localisation,
      price: parseFloat(price),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    }

    await db.insert(mission).values(missionData)

    return Response.json(
      { message: "Mission created successfully." },
      { status: SC.success.CREATED },
    )
  } catch (e) {
    return Response.json(
      { message: "Error occurred during the creation of a mission." },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
