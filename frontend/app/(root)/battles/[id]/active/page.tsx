import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const BattleActivePage = async (
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) => {
  const { id } = await params
  const currentUser = await getCurrentUser();
     
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  const battleId = id

  console.log("battleId", battleId)

  return (
    <>
      <PageHeader backLink="/" title="対戦中" battleId={battleId} isHumburger={true}/>
      <ContentContainer>
        <h1>対戦中</h1>
      </ContentContainer>
    </>
  )
}

export default BattleActivePage