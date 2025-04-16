import ContentContainer from '@/components/layout/container/ContentContainer';
import PageHeader from '@/components/layout/header/PageHeader';
import Profile from '@/features/Profile'
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader backLink="/" title="プロフィール"/>
      <ContentContainer>
        <Profile user={currentUser.data}/>
      </ContentContainer>
    </>
  )
}

export default ProfilePage