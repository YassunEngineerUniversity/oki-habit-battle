"use server"

import { callApi } from "@/utils/callApi"

export const updateBattle = async (formData: FormData, battleId: string) => {
  const response = await callApi(`/battles/${battleId}`, {
    method: "PUT",
    body: formData
  })

  return response
}