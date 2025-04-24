"use client"

import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from 'react'
import TodayStampButton from './TodayStampButton'
import Link from 'next/link'

interface TodayStampDialogProps {
  isTodayStamp: boolean
}

const TodayStampDialog = ({isTodayStamp}: TodayStampDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <TodayStampButton setOpen={setOpen} isTodayStamp={isTodayStamp} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-none w-[315px] max-w-[315px] sm:max-w-[315px]">
          <DialogTitle className="hidden"></DialogTitle>
            <div className="flex flex-col items-center justify-center px-4 py-6">
              <div className="relative max-w-[315px] w-full m-auto">
                <span className="text-center block font-bold pt-4">本日のスタンプをゲットしました！</span>
                <Image
                  src="/images/icon/archivement-stamp-icon.webp"
                  alt="本日のスタンプをゲット"
                  unoptimized
                  width={200}
                  height={200}
                  className="flex justify-center m-auto object-contain"
                />
                <Link href="/stamps" className="bg-violet-500 border block text-center border-violet-500 rounded-full w-full text-white py-4 text-base cursor-pointer hover:opacity-70 hover:bg-violet-500">獲得したスタンプを見る</Link>
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TodayStampDialog
