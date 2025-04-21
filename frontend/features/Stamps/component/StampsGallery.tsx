"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useState } from "react"

interface StampsGalleryProps {
  stamps:Stamp[]
}

const StampsGallery = ({stamps}: StampsGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<Stamp | null>(null)
  const [open, setOpen] = useState(false)

  const handleImageClick = (image: Stamp) => {
    setSelectedImage(image)
    setOpen(true)
  }

  return (
    <div>
      {stamps.length > 0? (
        <ul className="grid grid-cols-3 gap-4">
          {stamps.map((stamp: Stamp) => (
            <li key={stamp.id} className="cursor-pointer" onClick={() => handleImageClick(stamp)}>
              <Image src={stamp.image_url} alt="stamp" width={105} height={105} unoptimized/>
            </li>
          ))}
        </ul>
      ):(
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400 font-bold">獲得したスタンプはありません</p>
        </div>
      )}

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 border-none w-[300px] max-w-300px sm:max-w-[300px]">
        <DialogTitle className="hidden"></DialogTitle>
          <div className="flex flex-col items-center justify-center p-4 ">
            {selectedImage && (
            <div className="relative max-w-[300px] w-full m-auto">
            <Image
              src={selectedImage.image_url}
              alt="stamp"
              unoptimized
              width={300}
              height={300}
              className="w-[300px] h-[300px] object-contain"
            />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default StampsGallery