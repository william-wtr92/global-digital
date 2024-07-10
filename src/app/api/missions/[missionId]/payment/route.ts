import { eq } from "drizzle-orm"
import type { NextRequest } from "next/server"
import Stripe from "stripe"

import appConfig from "@/config/appConfig"
import { db } from "@/db/client"
import { mission } from "@/db/schema"
import { MissionStatus } from "@/features/missions/types/missions"
import { SC } from "@/utils/constants/status"
import routes from "@/utils/routes"

/* eslint-disable camelcase */
const stripe = new Stripe(appConfig.security.stripe.privateKey)

export const POST = async (
  req: NextRequest,
  { params: { missionId } }: { params: { missionId: string } },
) => {
  const { price, targetedUserId } = await req.json()

  try {
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Mission Payment",
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${appConfig.baseURL}${routes.missions.confirmPayment(missionId, targetedUserId)}`,
        cancel_url: `${appConfig.baseURL}${routes.missions.detailedMission(missionId)}`,
        metadata: {
          missionId,
        },
      })

    await db
      .update(mission)
      .set({ status: MissionStatus.completed })
      .where(eq(mission.id, missionId))

    return Response.json({ id: session.id }, { status: SC.success.OK })
  } catch (e) {
    return Response.json(
      {
        isError: true,
        message: "Error occurred during creating session.",
      },
      { status: SC.serverErrors.INTERNAL_SERVER_ERROR },
    )
  }
}
