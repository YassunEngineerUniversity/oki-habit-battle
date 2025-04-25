
import BattleList from "@/components/utils/battle/BattleList";
import FilterBattleArea from "@/components/utils/FilterBattleArea";
import type { BattleListType } from "@/types/battle/types";
import { MdArrowForwardIos } from "react-icons/md";

interface SearchResultBattleListProps {
  battles: BattleListType
}

const index = ({battles}: SearchResultBattleListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span>{battles.battles.length || 0}件の対戦</span>
        {battles.battles.length > 0 && (<FilterBattleArea/>)}
      </div>
      <BattleList battles={battles} />
    </div>
  );
}
export default index;