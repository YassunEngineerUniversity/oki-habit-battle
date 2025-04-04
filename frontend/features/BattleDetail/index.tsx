import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate, formatDateTime, formatPeriod } from "@/lib/formatDate";
import Image from "next/image";
import { FaCrown } from "react-icons/fa6";
import FavoriteButton from "./components/FavoriteButton";

interface BattleDetailProps {
  battle: BattleDetail;
}

const index = async ({battle}: BattleDetailProps) => {
  console.log(battle, "バトル詳細");
  return (
    <div className="p-3">
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
          <span className="text-sm">{battle.participants.length}人</span>
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
          <span className="text-sm">{formatDate(battle.battle_start_date)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">対戦終了日</span>
          <span className="text-sm">{formatDate(battle.battle_end_date)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">獲得報酬<span className="text-[10px]">（1人あたり）</span></span>
          <span className="text-sm">{battle.per_reword}P</span>
        </div>
      </div>
      <div className="mt-4">
        <FavoriteButton />
      </div>
      <div className="mt-4">
        <p className="text-sm">{battle.detail}</p>
      </div>
      <div className="mt-4">
        <Button className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70">この対戦に参加する</Button>
      </div>
    </div>
  )
}

export default index