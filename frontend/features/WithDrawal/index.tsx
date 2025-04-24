import { Card } from "@/components/ui/card"
import WithDrawalDialog from "./components/WithDrawalDialog"

const index = () => {
  return (
    <Card className="border border-gray-200 shadow-none px-4 py-8 gap-1">
      <div>
        <p>アカウントを削除すると、以下の情報も全て削除されます。確認の上、削除してください。</p>
        <ul className="list-disc grid grid-cols-1 gap-1 pl-4 mt-4">
          <li className="text-sm">プロフィール</li>
          <li className="text-sm">戦歴</li>
          <li className="text-sm">獲得したスタンプ</li>
          <li className="text-sm">獲得したハビバトポイント</li>
        </ul>
      </div>
      <div className="mt-6">
        <WithDrawalDialog />
      </div>
    </Card>
  )
}
export default index