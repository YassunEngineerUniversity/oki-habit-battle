import AuthPageTitle from "@/components/layout/AuthPageTitle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

const index = () => {

  
  return (
    <div className="pt-[100px]">
      <AuthPageTitle title="新規会員登録"/>
      <Card className="mt-8 border border-gray-200 shadow-none px-4 py-8 gap-5">
        <div>
          <Label className="text-sm mb-1 block">ユーザ名</Label>
          <Input className="border-gray-200 focus-visible:ring-violet-500 py-5" type="text" placeholder="ユーザ名を入力してください"/>
        </div>
        <div>
          <Label className="text-sm mb-1 block">メールアドレス</Label>
          <Input className="border-gray-200 focus-visible:ring-violet-500 py-5" type="text" placeholder="メールアドレスを入力してください"/>
        </div>
        <div>
          <Label className="text-sm mb-1 block">パスワード</Label>
          <Input className="border-gray-200 focus-visible:ring-violet-500 py-5" type="text" placeholder="パスワードを入力してください"/>
        </div>
        <div>
          <Button type="submit" className="w-full py-6 bg-violet-500 text-base text-white mt-6 cursor-pointer hover:opacity-80">登録する</Button>
        </div>
        <span className="text-center block text-sm ">もしくは</span>
        <div>
          <Button className="w-full py-6 bg-white border border-gray-200 shadow-none cursor-pointer hover:opacity-80 flex justify-center items-center gap-2">
            <Image src="/images/logo/google.png" width={20} height={20} alt="google"/>
            <span className="text-base">Sign up with Google</span>
          </Button>
        </div>
        <div className="text-center">
          <Link href="/login" className="underline text-sm cursor-pointer hover:opacity-80">ログインはこちら</Link>
        </div>
      </Card>
    </div>
  )
}

export default index