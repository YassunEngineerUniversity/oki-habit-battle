import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import Home from "@/features/Home";
import { checkCurrentUser } from "@/lib/checkCurrentUser";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";


const HomePage = async () => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader profile={currentUser.data.image_url} title="ホーム"/>
      <ContentContainer>
        <Home/>
      </ContentContainer>
    </>
  )
}

export default HomePage;