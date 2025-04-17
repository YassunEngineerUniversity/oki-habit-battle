import BattleList from "@/components/utils/battle/BattleList";
import { BattleListType } from "@/types/battle/types";
import { MdArrowForwardIos } from "react-icons/md";

interface SearchResultBattleListProps {
  battles: BattleListType
}

const index = ({battles}: SearchResultBattleListProps) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <span>{battles.battles.length || 0}件の対戦</span>
        <div className="flex gap-2 items-center">
          <span>絞り込み</span>
          <MdArrowForwardIos />
        </div>
      </div>
      <BattleList battles={battles} />
    </div>
  );
}

export default index;