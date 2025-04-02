import { getCurrentUser } from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";


const HomePage = async () => {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  // if (!currentUser || !currentUser?.success) {
  //   redirect("/login");
  // }

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  )
}

export default HomePage;