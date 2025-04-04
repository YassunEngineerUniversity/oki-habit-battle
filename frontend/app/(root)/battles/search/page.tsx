import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import Search from "@/features/Search";
import BattleCreateButton from "@/components/utils/battle/BattleCreateButton";

const SearchPage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <div className="relative">
      <Search/>
      <div className="fixed max-w-[375px] w-full bottom-20 left-0 right-0 m-auto z-10">
        <div className="w-[140px] ml-auto mr-3">
          <BattleCreateButton/>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
