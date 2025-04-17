import BattleItem from "@/components/utils/battle/BattleItem"
import { Battle } from "@/types/battle/types"
import { callApi } from "@/utils/callApi"
import { FaFire, FaHourglassHalf } from "react-icons/fa6"

const index = async () => {
  const battles = await callApi("/home", {
    method: "GET",
  })

  const activeBattles = battles?.data.active_battles
  const waitingBattles = battles?.data.waiting_battles

  console.log(waitingBattles)
  return (
    <>
      <div>
        <div className="flex justify-center gap-1 mb-2">
          <h2 className="text-lg font-bold">対戦中</h2>
          <FaFire className="text-red-500 w-[24px] h-[24px]"/>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {activeBattles.length === 0 && (
            <li className="text-center text-gray-300 font-bold">対戦中のバトルはありません</li>
          )}
          {activeBattles.map((battle: Battle) => 
            <li key={battle.id}>
              <BattleItem battle={battle}/>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-[60px]">
        <div className="flex justify-center gap-1 mb-2">
          <h2 className="text-lg font-bold">対戦待ち</h2>
          <FaHourglassHalf className="text-teal-500 w-[24px] h-[24px]"/>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {waitingBattles.length === 0 && (
            <li className="text-center text-gray-500 font-bold">対戦待ちのバトルはありません</li>
          )}
          {waitingBattles.map((battle: Battle) => 
            <li key={battle.id}>
              <BattleItem battle={battle}/>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default index