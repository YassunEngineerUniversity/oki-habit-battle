import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import BattleHistory from "@/features/BattleHistory";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const HistoryPage = async ({
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
      <PageHeader profile={currentUser.data.image_url} title="戦歴"/>
      <ContentContainer>
        <BattleHistory tab={tab}/>
      </ContentContainer>
    </>
  )
}

export default HistoryPage