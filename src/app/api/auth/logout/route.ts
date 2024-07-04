import { cookies } from "next/headers"

import { SC } from "@/def/status"

export const PUT = () => {
  cookies().delete("Authorization")

  return Response.json(
    { result: true, message: "Logged out." },
    { status: SC.success.OK },
  )
}
