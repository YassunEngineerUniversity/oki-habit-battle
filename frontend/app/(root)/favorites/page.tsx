import ContentContainer from '@/components/layout/container/ContentContainer';
import PageHeader from '@/components/layout/header/PageHeader';
import FavoriteBattles from '@/features/FavoriteBattles';
import { callApi } from '@/utils/callApi';
import { getCurrentUser } from '@/utils/getCurrentUser';
import { redirect } from 'next/navigation';

const FavoritePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  const levelParams = (await searchParams).level;
  const orderParams = (await searchParams).order;

  let url = `/battles/favorites`;
  if (levelParams) {
    url += `?level=${levelParams}`;
  }
  if (orderParams) {
    url += levelParams ? `&order=${orderParams}`: `?order=${orderParams}`;
  }

  const battles = await callApi(url, {
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