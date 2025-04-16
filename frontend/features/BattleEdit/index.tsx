import { callApi } from "@/utils/callApi";
import { BattleDetail } from "@/types/battle/types";
import BattleEditForm from "./components/BattleEditForm";

interface BattleEditProps {
  battle:BattleDetail
}

const Index = async ({battle}: BattleEditProps) => {
  const categories = await callApi("/battle-categories", {
    method: "GET",
  })

  return (
    <BattleEditForm battle={battle} categories={categories?.data}/>
  );
}
export default Index;