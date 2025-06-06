"use client"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import { SelectedStampType } from "@/types/stamps/types"
import { formatDateWithYear } from "@/lib/formatDate"

interface StampDialogProps {
  stamp: SelectedStampType
  open: boolean
  setOpen: (open: boolean) => void
}

const StampDialog = ({stamp, open, setOpen}: StampDialogProps) => {
  const { stamp: stampUrl, generatedDate } = stamp
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 border-none w-[315px] max-w-[315px] sm:max-w-[315px]">
        <DialogTitle className="hidden"></DialogTitle>
          <div className="flex flex-col items-center justify-center px-4 py-6">
            <span className="mb-2">{formatDateWithYear(generatedDate)}</span>
            <div className="relative max-w-[315px] w-full m-auto">
              <Image
                src={stampUrl}
                alt="stamp"
                unoptimized
                width={200}
                height={200}
                className="flex justify-center m-auto object-contain"
              />
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default StampDialog