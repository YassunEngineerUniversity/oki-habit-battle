import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, formatDateTime, formatDateWithYear, formatPeriod } from "@/lib/formatDate";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";
import FavoriteButton from "./components/FavoriteButton";
import ParticipantButton from "./components/ParticipantButton";
import { BattleDetail } from "@/types/battle/types";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import BattleDeleteButton from "./components/BattleDeleteButton";

interface BattleDetailProps {
  battle: BattleDetail;
  currentUserId: number;
}

const index = async ({battle, currentUserId}: BattleDetailProps) => {
  const isHost = currentUserId=== battle.host_user_id;
  const isParticipant = battle.participants.some((participant) => participant.user_id === currentUserId);

  console.log("battle", battle);

  return (
    <div className="p-3 relative">
      {isHost && (
        <Link href={`/battles/${battle.id}/edit`} className="absolute top-0 right-0 flex items-center gap-1 border border-gray-300 rounded-md px-[10px] pt-[10px] pb-2 hover:bg-gray-50">
          <span className="text-sm text-gray-500 leading-3">
            編集
          </span>
          <MdEdit className="w-[14px] h-[14px] mb-[2px] text-gray-500 inline-block"/>
        </Link>
      )}
      <div>
        <h2 className="text-2xl font-bold text-center">{battle.level}級</h2>
      </div>
      <div className="mt-6">
        <p className="text-center">一緒に協力してくれる仲間</p>
        <div className="flex gap-4 mt-5 justify-center">
          {battle.participants.map((participant) => (
            <div key={participant.name} className="relative">
              {participant.user_id === battle.host_user_id && (
                <FaCrown className="w-4 h-4 text-yellow-500 absolute top-[-16px] left-0 right-0 m-auto"/>
              )}
              <Avatar className="w-[50px] h-[50px]" key={participant.name}>
                {participant.avatar ? (
                  <AvatarImage src={participant.avatar} alt="avatar" className="rounded-full" />
                ) : (
                  <AvatarFallback className="rounded-full">
                    <Image src="/images/icon/no-avatar.png" className="rounded-full" width={50} height={50} alt="no-avatar"/>
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-10">
        <div className="flex justify-between items-center">
          <h3 className="text-[18px] font-bold">クリア条件</h3>
          <span className="text-[18px] font-bold">達成率{battle.achievement_rate}%以上</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">人数</span>
          <span className="text-sm">{battle.participant_limit}人</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">募集締切日</span>
          <span className="text-sm">{formatDateTime(battle.apply_end_date)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">対戦期間</span>
          <span className="text-sm">{formatPeriod(battle.battle_start_date, battle.battle_end_date)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">対戦開始日</span>
          <span className="text-sm">{formatDateWithYear(battle.battle_start_date)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">対戦終了日</span>
          <span className="text-sm">{formatDateWithYear(battle.battle_end_date)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">獲得報酬<span className="text-[10px]">（1人あたり）</span></span>
          <span className="text-sm">{battle.per_reword}P</span>
        </div>
      </div>
      <div className="mt-4">
        <FavoriteButton isFavorite={battle.isFavorite} battleId={battle.id}/>
      </div>
      <div className="mt-4">
        <p className="text-sm">{battle.detail}</p>
      </div>
      <div className="mt-4">
        {isHost? 
          (<BattleDeleteButton battleId={battle.id.toString()}/>)
          :
          (<ParticipantButton battleId={battle.id} isParticipant={isParticipant}/>)
        }
      </div>
    </div>
  )
}

export default index