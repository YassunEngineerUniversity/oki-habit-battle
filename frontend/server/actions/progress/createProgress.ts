"use server"

import { callApi } from "@/utils/callApi"

export const createProgress = async (battleId: string) => {
  const body = {
    battle_id: battleId
  }
  
  const response = await callApi(`/battle-progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })

  return response
}