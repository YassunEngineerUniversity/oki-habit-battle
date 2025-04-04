import BattleItem from "@/components/utils/battle/BattleItem";
import { MdArrowForwardIos } from "react-icons/md";

interface SearchResultBattleListProps {
  battles: SearchResultBattleList
}


const index = ({battles}: SearchResultBattleListProps) => {
  console.log(battles)
  return (
    <div>
      <div className="flex justify-between items-center">
        <span>{battles.battles.length}件の対戦</span>
        <div className="flex gap-2 items-center">
          <span>絞り込み</span>
          <MdArrowForwardIos />
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-3 mt-4">
        {battles.battles.length === 0 && (
          <li className="text-center text-gray-300 font-bold">バトルはありません</li>
        )}
        {battles.battles.map((battle: Battle) => 
          <li key={battle.id}>
            <BattleItem battle={battle}/>
          </li>
        )}
      </ul>
    </div>
  );
}

export default index;