import { callApi } from "@/utils/callApi";
import BattleCreateForm from "./components/BattleCreateForm";

const Index = async () => {
  const categories = await callApi("/battle-categories", {
    method: "GET",
  })

  return (
    <BattleCreateForm categories={categories?.data}/>
  );
}
export default Index;