import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BattleList from "@/components/utils/battle/BattleList"
import { callApi } from "@/utils/callApi"
import { MdArrowForwardIos } from "react-icons/md"

const index = async () => {
  const battleHistories = await callApi("/battles/histories/me", {
    method: "GET",
  })

  

  return (
    <>
      <Tabs defaultValue="data" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger
        className="pb-3 custom-tab cursor-pointer"
        value="data"
          >
        データ
          </TabsTrigger>
          <TabsTrigger
        className="pb-3 custom-tab cursor-pointer"
        value="list"
          >
        一覧
          </TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="p-4">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="list" className="p-4">
          <div>
            <div className="flex justify-between items-center">
              <span>{battleHistories?.data.length || 0}件の対戦</span>
              <div className="flex gap-2 items-center">
                <span>絞り込み</span>
                <MdArrowForwardIos />
              </div>
            </div>
            <BattleList battles={battleHistories?.data} />
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default index