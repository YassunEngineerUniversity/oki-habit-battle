"use client"

import AuthPageTitle from "@/components/utils/AuthPageTitle"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Loading from "@/components/utils/Loading"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { useRouter } from "next/navigation"
import login from "@/utils/login"

const loginSchema = z.object({
  email: z.string().email({message: "メールアドレスの形式が正しくありません"}),
  password: z.string().trim().min(6, {message: "6字以上で入力してください"}).max(78, {message: "78字以内で入力してください"}),
})

type LoginFormData = z.infer<typeof loginSchema>

const Index = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsPending(true);
    const state = await login(data);

    if(state.success) {
      router.push("/");
    } else {
      toast.error(state.message, { style: { background: "#dc2626", color: "#fff" }});
    }

    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pt-[100px]">
      <AuthPageTitle title="ログイン"/>
      <Card className="mt-8 border border-gray-200 shadow-none px-4 py-8 gap-5">
        <div>
          <Label className="text-sm mb-1 block">メールアドレス</Label>
          <Input
            {...register("email")}
            className="border-gray-200 focus-visible:ring-violet-500 py-5" 
            type="text" 
            placeholder="メールアドレスを入力してください"
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Label className="text-sm mb-1 block">パスワード</Label>
          <div className="relative">
            <Input
              {...register("password")}
              type={isPasswordVisible ? "text" : "password"}
              className="border-gray-200 focus-visible:ring-violet-500 py-5 pr-8" 
              placeholder="パスワードを入力してください"
              autoComplete="current-password"
            />
            <button 
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-[13px] text-gray-400 cursor-pointer"
            >
              {isPasswordVisible ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Button type="submit" className="w-full py-6 bg-violet-500 text-base text-white mt-6 cursor-pointer hover:opacity-80">
            {isPending ? <Loading/> : "ログインする" }
          </Button>
        </div>
        <span className="text-center block text-sm ">もしくは</span>
        <div>
          <Button className="w-full py-6 bg-white border border-gray-200 shadow-none cursor-pointer hover:opacity-80 flex justify-center items-center gap-2">
            <Image src="/images/logo/google.png" width={20} height={20} alt="google"/>
            <span className="text-base">Sign in with Google</span>
          </Button>
        </div>
        <div className="text-center">
          <Link href="/signup" className="underline text-sm cursor-pointer hover:opacity-80">新規登録はこちら</Link>
        </div>
      </Card>
    </form>
  )
}

export default Index