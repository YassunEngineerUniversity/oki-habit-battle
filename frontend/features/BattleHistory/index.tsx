import { Tabs, TabsContent } from "@/components/ui/tabs"
import BattleList from "@/components/utils/battle/BattleList"
import { callApi } from "@/utils/callApi"
import TabBattleList from "./components/TabBattleList"
import { Card } from "@/components/ui/card"
import HistoryCalender from "./components/HistoryCalender"
import { formatDateWithSlash } from "@/lib/formatDate"
import FilterBattleArea from "@/components/utils/FilterBattleArea"
import Image from "next/image"

interface BattleHistoryParams {
  tab: string | string[] | undefined,
  levelParams : string | string[] | undefined,
  orderParams : string | string[] | undefined
}

interface BattleHistoryProps {
  params: BattleHistoryParams
}

const index = async ({params}: BattleHistoryProps) => {
  const { tab, levelParams, orderParams } = params
  let tabValue = "data"
  const today = new Date()
  const dayOfWeek = today.getDay()
  const sunday = new Date(today)
  sunday.setDate(today.getDate() - dayOfWeek)
  const week = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + 7)

  let url = `/battles/histories/me`;
  if (levelParams) {
    url += `?level=${levelParams}`;
  }
  if (orderParams) {
    url += levelParams ? `&order=${orderParams}`: `?order=${orderParams}`;
  }

  const battleHistories = await callApi(url, {
    method: "GET",
  })

  const historySummary = await callApi("/history-summary", {
    method: "GET",
  })

  switch (tab) {
    case "data":
      tabValue = "data"
      break
    case "list":
      tabValue = "list"
      break
    default:
      break
  }

  const maxConsecutiveProgress = historySummary?.data.max_consecutive_progress
  const battleTotal = historySummary?.data.battle_total
  const rewordTotal = historySummary?.data.reword_total
  const weeklyProgressCount = historySummary?.data.weekly_progress_count

  return (
    <>
      <Tabs defaultValue={tabValue} className="w-full">
        <TabBattleList />
        <TabsContent value="data" className="pt-4">
          <HistoryCalender stamps={historySummary?.data.stamps}/>
          <div 
            className={`
              grid gap-3 mt-6 
              ${
                maxConsecutiveProgress.toString().length > 3 || 
                battleTotal.toString().length > 3 || 
                weeklyProgressCount.toString().length > 4 ||
                rewordTotal.toString().length > 4 ? "grid-cols-1" : "grid-cols-2"
              }
            `}>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <div className="flex items-center gap-2 justify-between">
                <h3 className="text-[28px] font-bold">{maxConsecutiveProgress}<span className="text-xl inline-block ml-1">日</span></h3>
                <Image src="/images/icon/totalConsecutiveCount-icon.webp" width={50} height={50} alt="" className=""/>
              </div>
              <span className="text-xl">総連続対戦記録</span>
            </Card>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <div className="flex items-center gap-2 justify-between">
                <h3 className="text-[28px] font-bold relative">{weeklyProgressCount}<span className="text-xl inline-block ml-1">回</span><span className="text-[10px] font-normal w-[120px] block absolute left-1 top-[-20px]">{formatDateWithSlash(sunday)}〜{formatDateWithSlash(week)}</span></h3>
                <Image src="/images/icon/weekConsecutiveCount-icon.webp" width={50} height={50} alt="" className=""/>
              </div>
              <span className="text-xl">週連続対戦記録</span>
            </Card>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <div className="flex items-center gap-2 justify-between">
                <h3 className="text-[28px] font-bold">{battleTotal}<span className="text-xl inline-block ml-1">回</span></h3>
                <Image src="/images/icon/battleTotalCount-icon.webp" width={50} height={50} alt="" className=""/>
              </div>
              <span className="text-xl">総対戦回数</span>
            </Card>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <div className="flex items-center gap-2 justify-between">
                <h3 className="text-[28px] font-bold">{rewordTotal}<span className="text-xl inline-block ml-1">P</span></h3>
                <Image src="/images/icon/totalPoint-icon.webp" width={50} height={50} alt="" className=""/>
              </div>
              <span className="text-xl">累積ハビバト<br/>ポイント</span>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="list" className="pt-4">
          <div>
            <div className="flex justify-between items-center">
              <span>{battleHistories?.data.battles.length || 0}件の対戦</span>
              <FilterBattleArea/>
            </div>
            <BattleList battles={battleHistories?.data} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default index