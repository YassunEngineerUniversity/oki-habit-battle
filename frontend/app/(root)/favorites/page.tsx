import ContentContainer from '@/components/layout/container/ContentContainer';
import PageHeader from '@/components/layout/header/PageHeader';
import FavoriteBattles from '@/features/FavoriteBattles';
import { callApi } from '@/utils/callApi';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  const battles = await callApi("/battles/favorites", {
    method: "GET",
  })

  return (
    <>
      <PageHeader backLink="/profile" title="お気に入りの対戦"/>
      <ContentContainer>
        <FavoriteBattles battles={battles?.data}/>
      </ContentContainer>
    </>
  )
}

export default FavoritePage