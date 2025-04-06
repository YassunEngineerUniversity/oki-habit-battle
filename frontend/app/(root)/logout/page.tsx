import ContentContainer from '@/components/layout/container/ContentContainer';
import PageHeader from '@/components/layout/header/PageHeader';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';
import Logout from '@/features/Logout';

const LogoutPage = async () => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader backLink="/profile" title="ログアウト"/>
      <ContentContainer>
        <Logout/>
      </ContentContainer>
    </>
  )
}

export default LogoutPage
