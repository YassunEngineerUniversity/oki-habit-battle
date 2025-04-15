import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

export const checkCurrentUser = async () => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }
}