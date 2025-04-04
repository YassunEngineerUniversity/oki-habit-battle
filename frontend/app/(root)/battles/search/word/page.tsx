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

  const wordQuery = await searchParams.q
  const wordTitle = wordQuery && !Array.isArray(wordQuery) ? wordQuery : "フリーワードなし"

  const battles = await callApi(`/battles?q=${wordQuery}`, {
    method: "GET",
  })

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
