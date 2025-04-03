import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

interface BattleItemProps {
  battle: BattleItem
}

const BattleItem = ({battle}:BattleItemProps) => {
  return (
    <Link href={`/battles/${battle.id}`} className="py-4 px-3 border border-gray-200 rounded-lg block">
      <div className="flex gap-3 items-center justify-between">
        <div className="w-[110px]">
          {battle.image ? (
            <Image src={battle.image} width={116} height={116} className="rounded-sm" alt="battle-image"/>
          ): (
            <Image src="/images/no-image.jpg" width={116} height={116} className="rounded-sm" alt="no-image"/>
          )}
        </div>
        <div className="w-[calc(100%-110px)]">
          <div className="flex justify-between items-center gap-1">
            <h3 className="text-base font-bold line-clamp-1 w-[calc(100%-50px)]">{ battle.title }</h3>
            <h4 className="font-bold text-2xl w-[50px] text-center">{battle.level}</h4>
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