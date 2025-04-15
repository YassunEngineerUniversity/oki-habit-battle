import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import BattleDetail from "@/features/BattleDetail";
import { redirect } from "next/navigation";
import { callApi } from "@/utils/callApi";

const BattleDetailPage = async (
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
  const battle = await callApi(`/battles/${battleId}`, {
    method: "GET",
  })

  return (
    <>
      <PageHeader backLink="/" title={battle?.data.title}/>
      <ContentContainer>
        <BattleDetail battle={battle?.data} currentUserId={currentUser?.data.id}/>
      </ContentContainer>
    </>
  )
}

export default BattleDetailPage