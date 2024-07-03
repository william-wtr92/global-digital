import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"

import { db } from "@/db/client"
import { freelance, users } from "@/db/schema"

export const PATCH = async (
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } },
) => {
  const body = await req.json()

  try {
    await db.update(users).set(body).where(eq(users.id, userId))

    await db.update(freelance).set(body).where(eq(freelance.userId, userId))

    return Response.json({ result: true })
  } catch (e) {
    return Response.json({ error: e }, { status: 500 })
  }
}
