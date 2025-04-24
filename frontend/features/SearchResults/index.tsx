import BattleList from "@/components/utils/battle/BattleList";
import FilterBattleArea from "@/components/utils/FilterBattleArea";
import { BattleListType } from "@/types/battle/types";

interface SearchResultBattleListProps {
  battles: BattleListType
}

const index = ({battles}: SearchResultBattleListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span>{battles.battles.length || 0}件の対戦</span>
        <FilterBattleArea/>
      </div>
      <BattleList battles={battles} />
    </div>
  );
}

export default index;