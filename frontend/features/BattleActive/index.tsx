import { ActiveBattle } from "@/types/battle/types"
import BattleSystem from "./components/BattleSystem"
import { formatRemainingTime } from "@/lib/formatDate"
import { levelImage } from "@/lib/leveImage"
import Image from "next/image"

interface BattleActiveProps {
  activeBattle: ActiveBattle
}

const index = ({activeBattle}: BattleActiveProps) => {
  const { imageUrl, digits } = levelImage(activeBattle.level)
  return (
    <div className="relative">
      <div
        className={`flex justify-between items-center px-2 absolute left-0 w-full ${
          digits === 1
        ? "top-[4px]"
        : digits === 2
        ? "top-[8px]"
        : digits === 3
        ? "top-[12px]"
        : "top-[4px]"
        }`}
      >
        <div>
          <span className="text-sm block font-bold">
        残り{formatRemainingTime(activeBattle.battle_end_date)}
          </span>
        </div>
        <Image
          src={imageUrl}
          width={digits === 1 ? 48 : digits === 2 ? 56 : 65}
          height={digits === 1 ? 48 : digits === 2 ? 56 : 65}
          alt="level"
          className=""
        />
      </div>
      <BattleSystem activeBattle={activeBattle}/>
    </div>
  )
}
export default index