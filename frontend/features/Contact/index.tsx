import { Card } from "@/components/ui/card"
import Link from "next/link"

const index = () => {
  return (
    <Card className="border border-gray-200 shadow-none px-4 py-8 gap-1">
      <div>
        <p>ご質問やご要望がございましたら、下記フォームよりお問い合わせください</p>
      </div>
      <div className="mt-4">
        <Link href="/" target="_blank" className="bg-violet-500 border block text-center border-vieolet-500 rounded-full w-full text-white py-4 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">
          お問い合わせフォームに進む
        </Link>
      </div>
    </Card>
  )
}

export default index