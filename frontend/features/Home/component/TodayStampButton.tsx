"use client"

import { Button } from "@/components/ui/button"
import { updateTodayStamp } from "@/server/actions/stamp/updateTodayStamp"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

interface TodayStampButtonProps {
  isTodayStamp: boolean
  setOpen: (open: boolean) => void
}

const TodayStampButton = ({isTodayStamp, setOpen}: TodayStampButtonProps) => {
  const [isTodayStampState, setIsTodayStampState] = useState(isTodayStamp)

  const hanldeStampClick = async () => {
    const response = await updateTodayStamp()
    
    if(response?.success) {
      setOpen(true)
      setIsTodayStampState(false)
    } else {
      toast.error(response?.message, { style: { background: "#dc2626", color: "#fff" }})
    }
  }


  return (
    <>
      {isTodayStampState && (
        <div className="fixed bottom-20 left-0 right-0 m-auto max-w-[351px] w-full flex justify-center items-center">
          <Button onClick={hanldeStampClick} type="submit" className="bg-violet-500 border border-violet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">
            <span>本日のスタンプをゲットする</span>
            <Image src="/images/icon/stamp-icon.webp" alt="archivement-icon" width={36} height={36} className=""/>
          </Button>
        </div>
      )}
    </>
  )
}

export default TodayStampButton