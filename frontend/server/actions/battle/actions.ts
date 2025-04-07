"use server"

import { BattleCreateState } from "@/types/battle/types";
import { redirect } from "next/navigation";


export const createBattle = async (prevState: any, formData: FormData): Promise<BattleCreateState> => {
  console.log('FormData entries:');
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  // Debugging the entire FormData object
  console.log('FormData object:', Object.fromEntries(formData.entries()));

  // redirect("/battle");
}