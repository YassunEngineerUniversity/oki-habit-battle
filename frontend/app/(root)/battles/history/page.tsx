import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import BattleHistory from "@/features/BattleHistory";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const HistoryPage = async () => {
  const currentUser = await getCurrentUser();
       
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader profile={currentUser.data.image_url} title="戦歴"/>
      <ContentContainer>
        <BattleHistory/>
      </ContentContainer>
    </>
  )
}

export default HistoryPage