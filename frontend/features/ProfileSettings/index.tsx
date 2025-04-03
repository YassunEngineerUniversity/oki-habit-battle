"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Loading from "@/components/utils/Loading"
import { editProfile } from "@/server/actions/profile/action"
import Image from "next/image"
import { useActionState, useEffect, useRef, useState } from "react"
import { IoIosCamera } from "react-icons/io"
import { toast } from "sonner"

interface ProfileSettingsState {
  user: User
}

const index = ({user}: ProfileSettingsState) => {
  const INITIALSTATE = {
    name: user.name,
    image: user.image_url,
    profile: user.profile,
  }

  const [state, formAction, isPending] = useActionState(editProfile, INITIALSTATE);
  const [preview, setPreview] = useState<string | null>(user.image_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    if(state.success !== undefined && !state.success) {
      toast.error(state.message, { style: { background: "#dc2626", color: "#fff" }});
    }
  }, [state])

  return (
    <form action={formAction}>
      <Card className="mt-2 border border-gray-200 shadow-none px-4 gap-5">
        <div>
          <Input
            id="name"
            name="name"
            className="border-gray-200 focus-visible:ring-violet-500 py-5" 
            type="text" 
            placeholder="ユーザネーム"
            autoComplete="username"
            defaultValue={state.name}
          />
          {state.errors?.name && (
            <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
          )}
        </div>
        <div className="ml-3">
          <Button 
            onClick={handleFileClick} 
            className="w-[80px] h-[80px] relative rounded-full cursor-pointer block shadow-none border-none p-0"
            type="button"
          >
            <Avatar className="w-full h-full">
              {preview ? (
                <AvatarImage src={preview} alt="avatar" className="rounded-full" />
              ) : (
                <AvatarFallback className="rounded-full">
                  <Image src="/images/icon/no-avatar.png" className="rounded-full" width={80} height={80} alt="no-avatar"/>
                </AvatarFallback>
              )}
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
              <IoIosCamera  className="w-4 text-white"/>
            </div>
          </Button>
          <Input
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            type="file"
            accept="image/*"
          />
          {state.errors?.image && (
            <p className="text-red-500 text-sm mt-1">{state.errors.image}</p>
          )}
        </div>
        <div>
          <Textarea
            id="profile"
            name="profile"
            className="border-gray-200 focus-visible:ring-violet-500 py-4 min-h-[200px]"
            placeholder="プロフィールを入力してください"
            defaultValue={state.profile}
          />
          {state.errors?.profile && (
            <p className="text-red-500 text-sm mt-1">{state.errors.profile}</p>
          )}
        </div>
        <div>
          <Button type="submit" className="w-full rounded-full py-6 bg-violet-500 text-base text-white mt-4 cursor-pointer hover:opacity-80">
            {isPending? <Loading/> : "変更を保存する" }
          </Button>
        </div>
      </Card>
    </form>
  )
}

export default index