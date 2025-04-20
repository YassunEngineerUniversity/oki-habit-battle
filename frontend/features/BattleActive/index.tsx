import { ActiveBattle } from "@/types/battle/types"
import BattleSystem from "./components/BattleSystem"
import { formatRemainingTime } from "@/lib/formatDate"

interface BattleActiveProps {
  activeBattle: ActiveBattle
}

const index = ({activeBattle}: BattleActiveProps) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center px-2 absolute top-0 left-0 w-full">
        <div>
          <span className="text-sm block font-bold">残り{formatRemainingTime(activeBattle.battle_end_date)}</span>
        </div>
        <span className="font-bold text-3xl block">{ activeBattle.level }</span>
      </div>
      <BattleSystem activeBattle={activeBattle}/>
    </div>
  )
}
export default index