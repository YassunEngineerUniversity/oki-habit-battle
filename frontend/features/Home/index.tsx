import { Button } from "@/components/ui/button"
import BattleItem from "@/components/utils/battle/BattleItem"
import { Battle } from "@/types/battle/types"
import { callApi } from "@/utils/callApi"
import Image from "next/image"
import { FaFire, FaHourglassHalf } from "react-icons/fa6"
import TodayStampButton from "./component/TodayStampButton"
import TodayStampDialog from "./component/TodayStampDialog"

const index = async () => {
  const battles = await callApi("/home", {
    method: "GET",
  })

  const activeBattles = battles?.data.active_battles
  const waitingBattles = battles?.data.waiting_battles

  return (
    <>
      <div>
        <div className="flex justify-center items-center gap-1 mb-2">
          <h2 className="text-lg font-bold">対戦中</h2>
          <Image src="/images/icon/battleActive-icon.webp" alt="battleActive-icon" width={40} height={40} className="w-10 h-10"/>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {activeBattles.length === 0 && (
            <li className="text-center text-gray-300 font-bold">対戦中のバトルはありません</li>
          )}
          {activeBattles.map((battle: Battle, index:number) => 
            <li key={index}>
              <BattleItem battle={battle} active={true}/>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-[60px]">
        <div className="flex justify-center gap-1 items-center mb-2">
          <h2 className="text-lg font-bold">対戦待ち</h2>
          <Image src="/images/icon/battleWaiting-icon.webp" alt="battleWaiting-icon" width={40} height={40} className="w-10 h-10"/>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {waitingBattles.length === 0 && (
            <li className="text-center text-gray-500 font-bold">対戦待ちのバトルはありません</li>
          )}
          {waitingBattles.map((battle: Battle, index:number) => 
            <li key={index}>
              <BattleItem battle={battle}/>
            </li>
          )}
        </ul>
      </div>
      <TodayStampDialog isTodayStamp={battles?.data.today_stamp}/>
    </>
  )
}

export default index