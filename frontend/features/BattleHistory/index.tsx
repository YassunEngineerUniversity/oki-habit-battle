import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BattleList from "@/components/utils/battle/BattleList"
import { callApi } from "@/utils/callApi"
import { MdArrowForwardIos } from "react-icons/md"
import TabBattleList from "./components/TabBattleList"
import { Card } from "@/components/ui/card"
import HistoryCalender from "./components/HistoryCalender"
import { formatDate, formatDateWithSlash } from "@/lib/formatDate"
import FilterBattleArea from "@/components/utils/FilterBattleArea"

interface BattleHistoryProps {
  tab: string | string[] | undefined
}

const index = async ({tab}: BattleHistoryProps) => {
  // let battleHistories = null
  let tabValue = "data"
  const today = new Date()
  const dayOfWeek = today.getDay()
  const sunday = new Date(today)
  sunday.setDate(today.getDate() - dayOfWeek)
  const week = new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + 7)

  const battleHistories = await callApi("/battles/histories/me", {
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

  return (
    <>
      <Tabs defaultValue={tabValue} className="w-full">
        <TabBattleList />
        <TabsContent value="data" className="pt-4">
          <HistoryCalender stamps={historySummary?.data.stamps}/>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <h3 className="text-3xl font-bold">{historySummary?.data.max_consecutive_progress}<span className="text-xl inline-block ml-1">日</span></h3>
              <span className="text-xl">総連続対戦記録</span>
            </Card>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <h3 className="text-3xl font-bold relative">{formatDateWithSlash(sunday)}<span className="text-[10px] font-normal inline-block absolute right-0 bottom-1">{formatDateWithSlash(sunday)}〜{formatDateWithSlash(week)}</span></h3>
              <span className="text-xl">週連続対戦記録</span>
            </Card>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <h3 className="text-3xl font-bold">{historySummary?.data.battle_total}<span className="text-xl inline-block ml-1">回</span></h3>
              <span className="text-xl">総対戦回数</span>
            </Card>
            <Card className="py-8 px-3 h-[158px] gap-2 border border-gray-300 shadow-none">
              <h3 className="text-3xl font-bold">{historySummary?.data.reword_total}<span className="text-xl inline-block ml-1">P</span></h3>
              <span className="text-xl">累積ハビバト<br/>ポイント</span>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="list" className="pt-4">
          <div>
            <div className="flex justify-between items-center">
              <span>{battleHistories?.data.battles.length || 0}件の対戦</span>
              {battleHistories?.data.battles.length > 0 && (<FilterBattleArea/>)}
            </div>
            <BattleList battles={battleHistories?.data} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default index