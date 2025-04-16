
"use server";

import { callApi } from "@/utils/callApi";

export const createParticipant = async(battleId:string) => {
  const response = await callApi(`/battles/${battleId}/participants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if(response?.success !== undefined && !response.success) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "バトルに参加しました",
  }
}

export const deleteParticipant = async(battleId:string) => {
  const response = await callApi(`/battles/${battleId}/participants`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  if(response?.success !== undefined && !response.success) {
    return {
      success: false,
      message: response.message,
    };
  }

  return {
    success: true,
    message: "バトルから退出しました",
  }
}