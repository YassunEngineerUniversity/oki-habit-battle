"use client"

import { Button } from "@/components/ui/button"

const ProgressButton = () => {
  return (
    <>
      <Button type="submit" className="bg-violet-500 border border-violet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">本日の習慣を達成する</Button>
    </>
  )
}

export default ProgressButton
