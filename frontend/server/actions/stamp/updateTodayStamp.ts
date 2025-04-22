"use server"

import { callApi } from "@/utils/callApi"

export const updateTodayStamp = async () => {
  const response = await callApi("/stamps/today", {
    method: "PUT",
  })

  return response
}