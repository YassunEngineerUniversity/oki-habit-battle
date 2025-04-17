
"use server";

import { callApi } from "@/utils/callApi";

export const createFavorite = async(battleId:string) => {
  const response = await callApi(`/battles/${battleId}/favorites`, {
    method: 'POST',
  })

  if(response?.success !== undefined && !response.success) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "お気に入りに追加しました",
  }
}

export const deleteFavorite = async(battleId:string) => {
  const response = await callApi(`/battles/${battleId}/favorites`, {
    method: 'DELETE',
  })

  if(response?.success !== undefined && !response.success) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "お気に入りを削除しました",
  }
}