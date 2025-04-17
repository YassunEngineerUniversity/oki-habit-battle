
"use server"

import { callApi } from "@/utils/callApi"

export const createBattle = async (formData: FormData) => {
  const response = await callApi("/battles", {
    method: "POST",
    body: formData
  })

  return response
}


