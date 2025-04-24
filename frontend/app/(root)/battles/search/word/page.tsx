import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import SearchResults from "@/features/SearchResults";
import { callApi } from "@/utils/callApi";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";

const WordPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  const wordParams = await searchParams.q
  const wordTitle = wordParams && !Array.isArray(wordParams) ? wordParams : "フリーワードなし"

  const levelParams = await searchParams.level;
  const orderParams = await searchParams.order;

  let query = `/battles?q=${wordParams}`;
  if (levelParams) {
    query += `&level=${levelParams}`;
  }
  if (orderParams) {
    query += `&order=${orderParams}`;
  }

  const battles = await callApi(query, {
    method: "GET",
  });

  return (
    <>
      <PageHeader backLink="/battles/search" title={wordTitle}/>
      <ContentContainer>
        <SearchResults battles={battles?.data}/>
      </ContentContainer>
    </>
  )
}

export default WordPage
