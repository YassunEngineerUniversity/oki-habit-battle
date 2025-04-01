"use client"

import AuthPageTitle from "@/components/layout/AuthPageTitle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loading from "@/components/utils/Loading"
import { signup } from "@/server/actions/signup/action"
import { error } from "console"
import Image from "next/image"
import Link from "next/link"
import { use, useActionState, useEffect } from "react"
import { toast } from "sonner"

const INITIALSTATE = {
  name: "",
  email: "",
  password: "",
}

const index = () => {
  const [state, formAction, isPending] = useActionState(signup, INITIALSTATE);

  useEffect(() => {
    if(state.success) {
      toast.success("ユーザ登録が完了しました", { style: { background: "#22bb33", color: "#fff" }});
    } else {
      toast.error("エラーが発生しました", { style: { background: "#dc2626", color: "#fff" }});
    }
  }, [state])

  return (
    <form action={formAction} className="pt-[100px]">
      <AuthPageTitle title="新規会員登録"/>
      <Card className="mt-8 border border-gray-200 shadow-none px-4 py-8 gap-5">
        <div>
          <Label className="text-sm mb-1 block">ユーザ名</Label>
          <Input
            id="name"
            name="name"
            className="border-gray-200 focus-visible:ring-violet-500 py-5" 
            type="text" 
            placeholder="ユーザ名を入力してください"
            autoComplete="username"
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>
        <div>
          <Label className="text-sm mb-1 block">メールアドレス</Label>
          <Input
            id="email"
            name="email"
            className="border-gray-200 focus-visible:ring-violet-500 py-5" 
            type="text" 
            placeholder="メールアドレスを入力してください"
            autoComplete="email"
          />
          {state.errors?.email && (
            <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
          )}
        </div>
        <div>
          <Label className="text-sm mb-1 block">パスワード</Label>
          <Input
            id="password" 
            name="password"
            type="password"
            className="border-gray-200 focus-visible:ring-violet-500 py-5" 
            placeholder="パスワードを入力してください"
            autoComplete="current-password"
          />
          {state.errors?.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>
        <div>
          <Button type="submit" className="w-full py-6 bg-violet-500 text-base text-white mt-6 cursor-pointer hover:opacity-80">
            {isPending? <Loading/> : "登録する" }
          </Button>
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
    </form>
  )
}

export default index