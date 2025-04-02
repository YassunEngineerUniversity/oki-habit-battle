import PageHeader from "@/components/layout/header/PageHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";


const HomePage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  console.log(currentUser, "currentUser");

  return (
    <div>
      <PageHeader profile={currentUser.data.image_url} title="ホーム" backLink="/home"/>
    </div>
  )
}

export default HomePage;