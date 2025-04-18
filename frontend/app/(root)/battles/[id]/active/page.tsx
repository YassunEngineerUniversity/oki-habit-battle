import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import BattleActive from "@/features/BattleActive";
import { callApi } from "@/utils/callApi";

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

  const activeBattle = await callApi(`/active-battles/${battleId}`, {
    method: "GET",
  })

  return (
    <>
      <PageHeader backLink="/" title="対戦中" battleId={battleId} isHumburger={true}/>
      <ContentContainer >
        <BattleActive activeBattle={activeBattle?.data}/>
      </ContentContainer>
    </>
  )
}

export default BattleActivePage