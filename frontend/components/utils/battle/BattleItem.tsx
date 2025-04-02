import Image from "next/image"
import Link from "next/link"

interface BattleItemProps {
  battle: BattleItem
}

const BattleItem = ({battle}:BattleItemProps) => {
  return (
    <Link href={`/battles/${battle.id}`} className="py-4 px-3 border border-gray-200 rounded-lg block">
      <div className="flex gap-3 items-center justify-between">
        <div className="w-[116px]">
          {battle.image ? (
            <Image src={battle.image} width={116} height={116} className="rounded-sm" alt="battle-image"/>
          ): (
            <Image src="/images/no-image.jpg" width={116} height={116} className="rounded-sm" alt="no-image"/>
          )}
        </div>
        <div className="w-[calc(100%-116px)]">
          <div className="flex justify-between items-center gap-2">
            <h3 className="text-base font-bold line-clamp-1">{battle.title}</h3>
            <h4 className="font-bold text-2xl">{battle.level}</h4>
          </div>
          <div className="mt-1">
            <p className="text-sm line-clamp-2 break-words whitespace-pre-wrap">{battle.detail}</p>
          </div>
          <div className="flex gap-[10px] mt-[10px]">
            {battle.participants.map((participant) => 
              participant.avatar ? (
                <Image src={participant.avatar} width={30} height={30} alt="avater" key={participant.name}/>
              ) : (
                <Image src="/images/no-image.jpg" width={30} height={30} alt="no-image" key={participant.name}/>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BattleItem