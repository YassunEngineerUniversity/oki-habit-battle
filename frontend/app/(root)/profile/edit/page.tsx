import ContentContainer from "@/components/layout/container/ContentContainer";
import PageHeader from "@/components/layout/header/PageHeader";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import ProfileEdit from "@/features/ProfileEdit";

const ProfileEditPage = async () => {
  const currentUser = await getCurrentUser();
 
  if (!currentUser || !currentUser?.success) {
    redirect("/login");
  }

  return (
    <>
      <PageHeader backLink="/" title="プロフィール編集"/>
      <ContentContainer>
        <ProfileEdit/>
      </ContentContainer>
    </>
  )
}

export default ProfileEditPage