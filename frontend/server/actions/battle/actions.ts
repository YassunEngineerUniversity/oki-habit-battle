

import { callApi } from "@/utils/callApi"
import { redirect } from "next/navigation";


export const createBattle = async (formData: FormData) => {
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`);
      console.log(`  Name: ${value.name}`);
      console.log(`  Size: ${value.size} bytes`);
      console.log(`  Type: ${value.type}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }
  // // TODO: ここでバトルを作成するAPIを叩く
  const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + '/battles';
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const data = await response.json();
    const errorMessage = Array.isArray(data.errors) ? data.errors[0] : data.errors;
    return {
      success: false,
      message: errorMessage ? errorMessage : "対戦の作成に失敗しました",
    }
  }

  const data = await response.json();
  return {
    success: true,
    message: "対戦を作成しました"
  }
}