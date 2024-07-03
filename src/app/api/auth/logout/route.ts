import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import { SC } from "@/def/status"

export const PUT = () => {
  cookies().delete("Authorization")

  return NextResponse.json(
    { result: true, message: "Logged out." },
    { status: SC.success.OK },
  )
}
