"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ActiveBattle } from "@/types/battle/types";
import { ATTACKPOINT } from "@/constants/battle";
import { Button } from "@/components/ui/button";
import { createProgress } from "@/server/actions/progress/createProgress";
import { toast } from "sonner";
import Link from "next/link";

interface BattleSystemProps {
  activeBattle: ActiveBattle
}

const BattleSystem = ({activeBattle}: BattleSystemProps) => {
  const hp = activeBattle.total_hp - (activeBattle.progress_count * ATTACKPOINT)
  const [targetHp, setTargetHp] = useState(hp)
  const [isProgress, setIsProgress] = useState(activeBattle.is_today_progress)
  const [open, setOpen] = useState(false)

  const MAXTARGETHP = activeBattle.total_hp

  const RADIUS = 70
  const circumference = 2 * Math.PI * RADIUS
  const dashOffset = circumference - (targetHp / MAXTARGETHP) * circumference

  const getColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage > 70) {
      return {
        targetColor: "green",
        characterUrl: "/images/battle/battleActive-character01.webp"
      }
    }
    if (percentage > 30) {
      return {
        targetColor: "yellow",
        characterUrl: "/images/battle/battleActive-character02.webp"
      }
    }
    if (percentage > 0) {
      return {
        targetColor: "red",
        characterUrl: "/images/battle/battleActive-character03.webp"
      }
    }
    return {
      targetColor: "gray",
      characterUrl: "/images/battle/battleActive-character04.webp"
    }
  }

  const { targetColor,  characterUrl} = getColor(targetHp, MAXTARGETHP)

  const handleProgressClick = async () => {
    const response = await createProgress(activeBattle.id.toString())
    
    if(response?.success) {
      setTargetHp((prevHp) => {
        const newHp = prevHp - ATTACKPOINT
        if (newHp <= 0) {
          return 0
        }
        return newHp
      })

      setIsProgress(true)
      setOpen(true)
    } else {
      toast.error(response?.message, { style: { background: "#dc2626", color: "#fff" }})
    }
  }

  return (
    <div>
      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            className="text-gray-200"
          />

          <circle
            cx="100"
            cy="100"
            r={RADIUS}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="15"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className={cn({
              "stroke-green-500": targetColor === "green",
              "stroke-yellow-500": targetColor === "yellow",
              "stroke-red-500": targetColor === "red",
            })}
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center mt-[-10px]">
          <div className="">
            {targetHp <= 0 && (<span className="text-white bg-red-500 rounded-full w-[80px] m-auto py-1 font-bold text-lg block text-center">達成</span>)}
            <Image src={characterUrl} alt="character" width={100} height={100} className="w-[100px] h-[100px]" />
          </div>
          <span className="text-4xl font-bold">{targetHp}</span>
          <span className="text-sm text-gray-500">/ {MAXTARGETHP}</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5 mt-1">
        {activeBattle.participants.map((participant, index) => (
          <div key={index} className="flex justify-between gap-3">
            <Avatar className="w-15 h-15">
              {participant.avatar ? (
                <AvatarImage src={participant.avatar} alt={`avatar-${index}`} className="rounded-full" />
              ) : (
                <AvatarFallback className="rounded-full">
                  <Image src="/images/icon/no-avatar.png" className="rounded-full" width={60} height={60} alt="no-avatar" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="w-full">
              <span className="text-sm font-bold">{participant.name || `ユーザ名${index + 1}`}</span>
              <div className="relative mt-[7px]">
                <Progress 
                  value={(participant.progress_count / activeBattle.battle_period) * 100}
                  className="w-full [&>div]:bg-green-500"
                />
                <span className="text-sm flex justify-end">{participant.progress_count}/{activeBattle.battle_period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        {isProgress ? (
          <span className="bg-gray-300 border border-gray-300 w-full block text-center rounded-full w-full text-white py-[14px] text-[18px]">本日の習慣は達成済み</span>
        ): (
          <Button onClick={handleProgressClick} type="submit" className="bg-violet-500 border border-violet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">本日の習慣を達成する</Button>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 border-none w-[315px] max-w-[315px] sm:max-w-[315px]">
          <DialogTitle className="hidden"></DialogTitle>
            <div className="flex flex-col items-center justify-center px-4 py-6">
              <div className="relative max-w-[315px] w-full m-auto">
                <span className="text-center block font-bold pt-4">本日の習慣を達成しました！</span>
                <Image
                  src="/images/icon/archivement-stamp-icon.webp"
                  alt="本日の進捗を達成"
                  unoptimized
                  width={200}
                  height={200}
                  className="flex justify-center m-auto object-contain"
                />
                <Link href="/" className="bg-violet-500 border block text-center border-violet-500 rounded-full w-full text-white py-4 text-base cursor-pointer hover:opacity-70 hover:bg-violet-500">ホームへ移動</Link>
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BattleSystem
