"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useState } from "react"

const WithDrawalDialog = () => {
  const [open, setOpen] = useState(true)
  const router = useRouter()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleAccoutnDelete = () => {
    // アカウント削除の処理をここに追加
    setOpen(true)
  }

  return(
    <>
      <Button onClick={handleOpen} className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-base cursor-pointer hover:opacity-70 hover:bg-violet-500">
        アカウントを削除する
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-none w-[315px] max-w-300px sm:max-w-[315px]">
          <DialogTitle className="hidden"></DialogTitle>
            <div className="flex flex-col items-center justify-center px-4 pt-[50px] pb-10">
              <div className="relative max-w-[315px] w-full m-auto">
                <p className="text-base text-center">本当にアカウントを削除しますか？</p>
                <div className="mt-6">
                  <Button onClick={handleAccoutnDelete} className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-base cursor-pointer hover:opacity-70 hover:bg-violet-500">
                    アカウントを削除する
                  </Button>
                </div>
                <div className="mt-3">
                  <Button onClick={handleCancel} className="bg-gray-400 border border-gray-400 rounded-full w-full text-white py-7 text-base cursor-pointer hover:opacity-70 hover:bg-gray-400">
                    キャンセル
                  </Button>
                </div>
              </div>
            </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WithDrawalDialog