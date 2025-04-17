"use server"

import { callApi } from "@/utils/callApi"

export const deleteBattle = async (battleId: string) => {
  const response = await callApi(`/battles/${battleId}`, {
    method: "DELETE",
  })

  return response
}