"use client"

import { Button } from "@/components/ui/button"
import { updateTodayStamp } from "@/server/actions/stamp/updateTodayStamp"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface TodayStampButtonProps {
  isTodayStamp: boolean
}

const TodayStampButton = ({isTodayStamp}: TodayStampButtonProps) => {
  const [isTodayStampState, setIsTodayStampState] = useState(isTodayStamp)
  const router = useRouter()

  const hanldeStampClick = async () => {
    const response = await updateTodayStamp()

    if(response?.success) {
      toast.success("本日のスタンプをゲットしました", { style: { background: "#4ade80", color: "#fff" }})
      router.push("/stamps")
    } else {
      toast.error(response?.message, { style: { background: "#dc2626", color: "#fff" }})
    }
  }


  return (
    <>
      {isTodayStampState && (
        <div className="fixed bottom-20 left-0 right-0 m-auto max-w-[351px] w-full flex justify-center items-center">
          <Button onClick={hanldeStampClick} type="submit" className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">
            <span>本日のスタンプをゲットする</span>
            <Image src="/images/icon/stamp-icon.webp" alt="archivement-icon" width={36} height={36} className=""/>
          </Button>
        </div>
      )}
    </>
  )
}

export default TodayStampButton