import { callApi } from "@/utils/callApi";
import BattleForm from "../../components/utils/battle/BattleForm";

const Index = async () => {
  const categories = await callApi("/battle-categories", {
    method: "GET",
  })

  return (
    <BattleForm categories={categories?.data}/>
  );
}
export default Index;