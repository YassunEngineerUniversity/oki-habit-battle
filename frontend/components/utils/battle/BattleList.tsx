import BattleItem from "./BattleItem"

interface BattleListProps {
  battles: SearchResultBattleList
  noBattleText?: string
}

const BattleList = ({battles, noBattleText = "対戦はありません"}: BattleListProps) => {
  return (
    <ul className="grid grid-cols-1 gap-3 mt-4">
      {battles.battles.length === 0 && (
        <li className="text-center text-gray-300 font-bold">{noBattleText}</li>
      )}
      {battles.battles.map((battle: Battle) => 
        <li key={battle.id}>
          <BattleItem battle={battle}/>
        </li>
      )}
    </ul>
  )
}

export default BattleList
