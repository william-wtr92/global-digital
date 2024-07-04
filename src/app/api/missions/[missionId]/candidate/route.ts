import { and, eq } from "drizzle-orm"
import { type JwtPayload, verify } from "jsonwebtoken"
import type { NextRequest } from "next/server"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { type InsertCandidate, candidate } from "@/db/schema"
import { SC } from "@/def/status"

export const POST = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
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

    const candidateData: InsertCandidate = {
      missionId,
      userId: id,
      status: "pending",
    }

    await db.insert(candidate).values(candidateData)

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      {
        isError: true,
        message: "Error occurred during candidate at this mission",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const GET = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
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

    const checkIfUserAlreadyCandidate = await db
      .select()
      .from(candidate)
      .where(and(eq(candidate.missionId, missionId), eq(candidate.userId, id)))

    const isUserAlreadyCandidate = checkIfUserAlreadyCandidate.length > 0

    return Response.json(
      { result: true, isUserAlreadyCandidate },
      { status: SC.success.OK },
    )
  } catch (e) {
    return Response.json(
      {
        isError: true,
        message: "Error occurred.",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}

export const DELETE = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
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

    const checkIfUserAlreadyCandidate = await db
      .select()
      .from(candidate)
      .where(and(eq(candidate.missionId, missionId), eq(candidate.userId, id)))

    if (checkIfUserAlreadyCandidate.length === 0) {
      return Response.json(
        { message: "You are not candidate at this mission" },
        { status: SC.errors.NOT_FOUND },
      )
    }

    await db
      .delete(candidate)
      .where(and(eq(candidate.missionId, missionId), eq(candidate.userId, id)))

    return Response.json({ result: true }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      {
        message: "Error occurred during candidate at this mission",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
