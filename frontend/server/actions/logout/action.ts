"use server"

import { callApi } from "@/utils/callApi"
import { cookies } from "next/headers"

export const logout = async () => {
  const response = await callApi("/logout", {
    method: "DELETE",
  })

  if (!response?.success) {
    return response
  }

  const cookieStore = await cookies()
  const session = cookieStore.get("_habitbattle_session")
  if (session) {
    cookieStore.delete("_habitbattle_session")
  }

  return response
}