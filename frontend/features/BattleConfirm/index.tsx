"use client"

import { Button } from "@/components/ui/button";
import { createPeriodISOS } from "@/lib/createPeriod";
import { formatPeriodWithTime } from "@/lib/formatDate";
import { BattleFormData } from "@/schema/battle/schema";
import { createBattle } from "@/server/actions/battle/createBattle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner"


const Index = () => {
  const router = useRouter()

  const form = useFormContext<BattleFormData>()
  const values = form.getValues()
  const imageUrl = values.backgroundImage ? URL.createObjectURL(values.backgroundImage) : null

  const formatApplyStartDate = formatPeriodWithTime(0)
  const formatApplyEndDate = formatPeriodWithTime(Number(values.applyPeriod))

  const formatBattleStartDate = formatPeriodWithTime(Number(values.applyPeriod))
  const formatBattleEndDate = formatPeriodWithTime(Number(values.applyPeriod) + Number(values.battlePeriod))

  const {applyStartDate, applyEndDate, battleStartDate, battleEndDate} = createPeriodISOS(Number(values.applyPeriod), Number(values.battlePeriod))

  const handleSubmit = async() => {
    const formData = new FormData()

    formData.append("title", values.title)
    formData.append("apply_start_date", applyStartDate)
    formData.append("apply_end_date", applyEndDate)
    formData.append("battle_start_date", battleStartDate)
    formData.append("battle_end_date", battleEndDate)
    formData.append("participant_limit", values.participants)
    formData.append("achievement_rate", values.achievementRate)
    formData.append("detail", values.detail)

    if(values.categories && values.categories.length > 0) {
      for (let index = 0; index < values.categories.length; index++) {
        formData.append("categories[][name]", values.categories[index].name)
      }
    }

    if(values.backgroundImage) {
      formData.append("background_image", values.backgroundImage)
    }

    const response = await createBattle(formData)

    if(response?.success) {
      toast.success("対戦を作成しました", { style: { background: "#4ade80", color: "#fff" }})
      router.push("/?tab=waitingBattles")
    } else {
      toast.error(response?.message, { style: { background: "#dc2626", color: "#fff" }})
    }
  }

  return (
    <div className="grid gap-6 px-2">
      <div>
        <span className="text-sm block font-bold">対戦タイトル</span>
        <span className="text-sm block mt-2">{values.title}</span>
      </div>
      <div>
        <span className="text-sm font-bold">カテゴリー</span>
        <ul className="flex mt-2">
          {values.categories.map((category, index) => (
            <li key={index} className="text-sm">
              {category.name}
              {index !== values.categories.length - 1 && ", "}
            </li>
          ))}
        </ul>
      </div>
      {imageUrl && (
        <div className="flex justify-between items-center">
          <span className="text-sm block font-bold">画像</span>
          <div>
            <Image src={imageUrl} width={100} height={100} alt="battle create image"/>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center">
        <span className="text-sm block font-bold">人数</span>
        <span className="text-sm block mt-2">{values.participants}人</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm block font-bold">募集期間</span>
        <span className="text-sm block mt-2">{formatApplyStartDate} 〜<br/>{formatApplyEndDate}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm block font-bold">対戦期間</span>
        <span className="text-sm block mt-2">{formatBattleStartDate} 〜<br/>{formatBattleEndDate}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm block font-bold">達成率</span>
        <span className="text-sm block mt-2">{values.achievementRate}%以上</span>
      </div>
      <div>
        <span className="text-sm block font-bold">対戦の詳細</span>
        <span className="text-sm block mt-2">{values.detail}</span>
      </div>
      <div className="mt-4">
        <Button onClick={handleSubmit} className="bg-violet-500 border border-violet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">対戦を作成する</Button>
      </div>
      <div>
        <Link href="/battles/create" className="bg-gray-400 border border-gray-400 w-full block text-center rounded-full w-full text-white pt-[14px] pb-[15px] text-[18px] cursor-pointer hover:opacity-70">戻る</Link>
      </div>
    </div>
  );
}
export default Index;