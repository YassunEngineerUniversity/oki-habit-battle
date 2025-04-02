import { Button } from "@/components/ui/button";
import { formatDate, formatDateTime, formatPeriod } from "@/lib/formatDate";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";

interface BattleDetailProps {
  battle: BattleDetail;
}

const Index = async ({battle}: BattleDetailProps) => {
  return (
    <div className="p-3">
      <div>
        <h2 className="text-2xl font-bold text-center">難易度{battle.level}級</h2>
      </div>
      <div className="mt-6">
        <p className="text-center">一緒に協力してくれる仲間</p>
        <div className="flex gap-4 mt-4 justify-center">
          {battle.participants.map((participant) => (
            participant.avatar ? (
              <Image src={participant.avatar} className="rounded-full" width={50} height={50} alt="avater" key={participant.name}/>
            ) : (
              <Image src="/images/no-image.jpg" className="rounded-full" width={50} height={50} alt="no-image" key={participant.name}/>
            )
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
        <Button className="bg-amber-400 border border-vieolet-500 rounded-full w-full text-white flex justify-center gap-1 cursor-pointer hover:opacity-70">
          <span>お気に入りに追加</span>
          <FaRegStar className="w-3 block mt-[-2px]"/>
        </Button>
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

export default Index