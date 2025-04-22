import type { Battle, BattleListType } from "@/types/battle/types"
import BattleItem from "./BattleItem"

interface BattleListProps {
  battles: BattleListType
  noBattleText?: string
}

const BattleList = ({battles, noBattleText = "対戦はありません"}: BattleListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-3 mt-4">
      {battles.battles.length === 0 && (
        <li className="text-center text-gray-300 font-bold">{noBattleText}</li>
      )}
      {battles.battles.map((battle: Battle, index:number) => 
        <li key={index}>
          <BattleItem battle={battle}/>
        </li>
      )}
    </ul>
  )
}

export default BattleList
