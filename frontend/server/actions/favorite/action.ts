
"use server";

import { callApi } from "@/utils/callApi";

export const createFavorite = async(battleId:string) => {
  const response = await callApi(`/battles/${battleId}/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })


  if(!response) {
    return {
      success: false,
      message: "エラーが発生しました",
    }
  }

  return response;
}

export const deleteFavorite = async(battleId:string) => {
  const response = await callApi(`/battles/${battleId}/favorites`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if(!response) {
    return {
      success: false,
      message: "エラーが発生しました",
    }
  }

  return response;
}