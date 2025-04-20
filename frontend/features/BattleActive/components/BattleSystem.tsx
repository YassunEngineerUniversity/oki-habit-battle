"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import ProgressButton from "./ProgressButton";
import { ActiveBattle } from "@/types/battle/types";
import { ATTACKPOINT } from "@/constants/battle";

interface BattleSystemProps {
  activeBattle: ActiveBattle
}

const BattleSystem = ({activeBattle}: BattleSystemProps) => {
  const hp = activeBattle.total_hp - (activeBattle.progress_count * ATTACKPOINT)
  const [targetHp, setTargetHp] = useState(hp)
  const [avatar, setAvatar] = useState("")
  const MAXTARGETHP = activeBattle.total_hp

  console.log("activeBattle", activeBattle)
  // 円形ゲージの計算
  const RADIUS = 70
  const circumference = 2 * Math.PI * RADIUS
  const dashOffset = circumference - (targetHp / MAXTARGETHP) * circumference

   // HPに基づく色の取得
   const getColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage > 70) return "green"
    if (percentage > 30) return "yellow"
    return "red"
  }

  // ターゲットの色
  const targetColor = getColor(targetHp, MAXTARGETHP)

  return (
    <div>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 背景の円 */}
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

          {/* HPインジケーター */}
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

        {/* 中央のHPテキスト */}
        <div className="absolute flex flex-col items-center justify-center mt-[-10px]">
          <div className="">
            <Image src="/images/battle/battleActive-character.webp" alt="character" width={100} height={100} className="w-[100px] h-[100px]" />
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
        <ProgressButton />
      </div>
    </div>
  )
}

export default BattleSystem
