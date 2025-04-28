
import BattleItem from "@/components/utils/battle/BattleItem"
import { Battle } from "@/types/battle/types"
import { callApi } from "@/utils/callApi"
import Image from "next/image"
import TodayStampDialog from "./component/TodayStampDialog"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import TabHomeList from "./component/TabHomeList"

interface HomeProps {
  tab: string | string[] | undefined
}

const index = async ({tab}:HomeProps) => {
  let tabValue = "todayTasks"
  const battles = await callApi("/home", {
    method: "GET",
  })

  const activeBattles = battles?.data.active_battles
  const waitingBattles = battles?.data.waiting_battles
  const todayTaskBattles = battles?.data.today_task_battles

  switch (tab) {
    case "todayTasks":
      tabValue = "todayTasks"
      break
    case "activeBattles":
      tabValue = "activeBattles"
      break
    case "waitingBattles":
      tabValue = "waitingBattles"
      break
    default:
      break
  }
  return (
    <>
      <Tabs defaultValue={tabValue} className="w-full">
        <TabHomeList/>
        <TabsContent value="todayTasks" className="pt-2">
          <div>
            <div className="flex justify-center items-center gap-1 mb-2">
              <Image src="/images/icon/todayTasks-icon.webp" alt="battleActive-icon" width={60} height={60} className="w-[60px] h-[60px"/>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {todayTaskBattles.length < 0 ? (
                todayTaskBattles.map((battle: Battle, index:number) => 
                  <li key={index}>
                    <BattleItem battle={battle} active={true}/>
                  </li>
                )
              ) : (
                <li className="text-center text-gray-300 font-bold">本日のタスクはありません</li>
              )}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="activeBattles" className="pt-2">
          <div>
            <div className="flex justify-center items-center gap-1 mb-2">
              <Image src="/images/icon/activeBattles-icon.webp" alt="battleActive-icon" width={60} height={60} className="w-[60px] h-[60px"/>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {activeBattles.length > 0 ? (
                activeBattles.map((battle: Battle, index:number) => 
                  <li key={index}>
                    <BattleItem battle={battle}/>
                  </li>
                )
              ) : (
                <li className="text-center text-gray-300 font-bold">対戦待ちのバトルはありません</li>
              )}
            </ul>
          </div>
        </TabsContent>
        <TabsContent value="waitingBattles" className="pt-2">
          <div>
            <div className="flex justify-center gap-1 items-center mb-2">
              <Image src="/images/icon/waitingBattles-icon.webp" alt="battleWaiting-icon" width={60} height={60} className="w-[60px] h-[60px"/>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {waitingBattles.length > 0 ? (
                waitingBattles.map((battle: Battle, index:number) => 
                  <li key={index}>
                    <BattleItem battle={battle}/>
                  </li>
                )
              ) : (
                <li className="text-center text-gray-300 font-bold">対戦待ちのバトルはありません</li>
              )}
            </ul>
          </div>
        </TabsContent>
      </Tabs>
      <TodayStampDialog isTodayStamp={battles?.data.today_stamp} StampImageUrl={battles?.data.today_stamp_url}/>
    </>
  )
}

export default index