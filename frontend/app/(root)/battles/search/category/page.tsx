import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import SearchResults from "@/features/SearchResults";
import PageHeader from "@/components/layout/header/PageHeader";
import ContentContainer from "@/components/layout/container/ContentContainer";
import { callApi } from "@/utils/callApi";

const CategoryPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser = await getCurrentUser();
   
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  const categoryParams = await searchParams.category;
  const categoryTitleParams = await searchParams.title;
  const levelParams = await searchParams.level;
  const orderParams = await searchParams.order;

  const categoryTitle = categoryTitleParams && !Array.isArray(categoryTitleParams) ? categoryTitleParams : "カテゴリーなし";

  let query = `/battles?category=${categoryParams}`;
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
      <PageHeader backLink="/battles/search" title={categoryTitle}/>
      <ContentContainer>
        <SearchResults battles={battles?.data}/>
      </ContentContainer>
    </>
  )
}

export default CategoryPage
