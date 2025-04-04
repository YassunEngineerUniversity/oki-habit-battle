import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import CategorizedBattleList from "@/features/CategorizedBattleList";
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

  const categoryQuery = await searchParams.category
  const categoryTitleParams = await searchParams.title

  const categoryTitle = categoryTitleParams && !Array.isArray(categoryTitleParams) ? categoryTitleParams : "カテゴリーなし"

  const battles = await callApi(`/battles?category=${categoryQuery}`, {
    method: "GET",
  })

  return (
    <>
      <PageHeader backLink="/battles/search" title={categoryTitle}/>
      <ContentContainer>
        <CategorizedBattleList battles={battles?.data}/>
      </ContentContainer>
    </>
  )
}

export default CategoryPage
