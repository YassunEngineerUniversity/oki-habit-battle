
"use server"

import { callApi } from "@/utils/callApi"


export const createBattle = async (formData: FormData) => {
  const response = await callApi("/battles", {
    method: "POST",
    body: formData
  })

  return response
}

export const updateBattle = async (formData: FormData, id: string) => {
  const response = await callApi(`/battles/${id}`, {
    method: "PUT",
    body: formData
  })

  return response
}

