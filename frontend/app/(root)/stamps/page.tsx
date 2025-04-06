import ContentContainer from '@/components/layout/container/ContentContainer';
import PageHeader from '@/components/layout/header/PageHeader';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';
import Stamps from '@/features/Stamps';

const StampsPage = async() => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader backLink="/profile" title="獲得したスタンプ"/>
      <ContentContainer>
        <Stamps/>
      </ContentContainer>
    </>
  )
}

export default StampsPage
