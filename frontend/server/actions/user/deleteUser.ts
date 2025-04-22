"use server"

import { callApi } from "@/utils/callApi"

export const deleteUser = async () => {
  const response = await callApi("/me", {
    method: "DELETE",
  })

  return response
}
