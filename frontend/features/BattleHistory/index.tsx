import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const index = () => {
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
          Change your password here.
        </TabsContent>
      </Tabs>
    </>
  )
}

export default index