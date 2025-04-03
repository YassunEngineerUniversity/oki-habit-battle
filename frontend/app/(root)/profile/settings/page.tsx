import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import ProfileSettings from "@/features/ProfileSettings";

const ProfileEditPage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  console.log("currentUser", currentUser);

  return (
    <>
      <PageHeader backLink="/" title="プロフィール設定"/>
      <ContentContainer>
        <ProfileSettings user={currentUser.data}/>
      </ContentContainer>
    </>
  )
}

export default ProfileEditPage