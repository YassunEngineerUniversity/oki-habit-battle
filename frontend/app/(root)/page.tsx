import PageHeader from "@/components/layout/header/PageHeader";
import Home from "@/features/Home";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";


const HomePage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <div>
      <PageHeader profile={currentUser.data.image_url} title="ホーム"/>
      <div className="pt-[60px] pb-[90px]">
        <Home/>
      </div>
    </div>
  )
}

export default HomePage;