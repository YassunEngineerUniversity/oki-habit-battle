import ContentContainer from '@/components/layout/container/ContentContainer'
import PageHeader from '@/components/layout/header/PageHeader'
import BattleCreate from '@/features/BattleCreate'
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';

const BattleCreatePage = async () => {
  const currentUser = await getCurrentUser();
     
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader backLink="/" title="対戦の作成"/>
      <ContentContainer>
        <BattleCreate/>
      </ContentContainer>
    </>
  )
}

export default BattleCreatePage
