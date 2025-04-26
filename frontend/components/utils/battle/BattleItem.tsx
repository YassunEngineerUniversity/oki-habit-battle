import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { checkWithinDay } from "@/lib/checkWithinDay"
import { levelImage } from "@/lib/leveImage"
import type { Battle, BattleItem } from "@/types/battle/types"
import Image from "next/image"
import Link from "next/link"

interface BattleItemProps {
  battle: Battle
  active?: boolean
}

const BattleItem = ({battle, active}:BattleItemProps) => {
  const { imageUrl, digits } = levelImage(battle.level)

  return (
    <Link href={active? `/battles/${battle.id}/active`: `/battles/${battle.id}`} className="py-4 px-3 border border-gray-200 rounded-lg block relative">
      {checkWithinDay(battle.created_at, 3) && (<span className="text-xs text-white font-bold absolute top-2 left-2 border border-red-500 py-[2px] px-4 rounded-full bg-red-500">NEW</span>)}
      <div className="flex gap-3 items-center justify-between">
        <div className="w-[110px]">
          {battle.image ? (
            <Image src={battle.image} width={116} height={116} className="rounded-sm" alt="battle-image" unoptimized/>
          ): (
            <Image src="/images/no-image.jpg" width={116} height={116} className="rounded-sm" alt="no-image"/>
          )}
        </div>
        <div className="w-[calc(100%-110px)]">
          <div className="flex justify-between items-center gap-1">
            <h3 className="text-base font-bold line-clamp-1 w-[calc(100%-50px)]">{ battle.title }</h3>
            {digits == 1 && (
              <Image src={imageUrl} width={30} height={30} alt="level" className="absolute top-[6px] right-[6px]"/>
            )}
            {digits == 2 && (
              <Image src={imageUrl} width={35} height={35} alt="level" className="absolute top-[4px] right-[6px]"/>
            )}
            {digits == 3 && (
              <Image src={imageUrl} width={40} height={40} alt="level" className="absolute top-[2px] right-[6px]"/>
            )}
          </div>
          <div className="mt-1">
            <p className="text-sm line-clamp-2 break-words whitespace-pre-wrap">{battle.detail}</p>
          </div>
          <div className="flex gap-[10px] mt-2">
            {battle.participants.map((participant) => 
              <Avatar className="w-[30px] h-[30px]" key={participant.name}>
                {participant.avatar ? (
                  <AvatarImage src={participant.avatar} alt="avatar" className="rounded-full" />
                ) : (
                  <AvatarFallback className="rounded-full">
                    <Image src="/images/icon/no-avatar.png" className="rounded-full" width={30} height={30} alt="no-avatar"/>
                  </AvatarFallback>
                )}
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BattleItem