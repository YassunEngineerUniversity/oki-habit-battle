import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import Home from "@/features/Home";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";


const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentUser = await getCurrentUser();
  const tab = (await searchParams).tab;
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader profile={currentUser.data.image_url} title="ホーム"/>
      <ContentContainer>
        <Home tab={tab}/>
      </ContentContainer>
    </>
  )
}

export default HomePage;