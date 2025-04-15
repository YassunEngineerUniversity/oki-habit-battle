import ContentContainer from "@/components/layout/container/ContentContainer"
import PageHeader from "@/components/layout/header/PageHeader"
import BattleConfirm from "@/features/BattleConfirm"
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const ConfirmPage = async() => {
  const currentUser = await getCurrentUser();
     
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }
  return (
    <>
      <PageHeader backLink="/battles/create" title="対戦の作成の確認"/>
      <ContentContainer>
        <BattleConfirm/>
      </ContentContainer>
    </>
  )
}

export default ConfirmPage
