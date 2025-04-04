import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import Search from "@/features/Search";

const SearchPage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <Search/>
    </>
  )
}

export default SearchPage
