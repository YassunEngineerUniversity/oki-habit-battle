"use client"

import { Button } from '@/components/ui/button'
import { useSwitchState } from '@/hooks/useSwitchState'
import { createParitipant, deleteParitipant } from '@/server/actions/participant/actions'

interface ParticipantButtonProps {
  isParticipant: boolean,
  battleId: number
}

const ParticipantButton = ({battleId, isParticipant}: ParticipantButtonProps) => {
  console.log("isParticipant", isParticipant)
  const {isSwitchState: isParicipantState, handleSwitchState: handleParticipant} = useSwitchState(
    battleId.toString(),
    isParticipant,
    createParitipant,
    deleteParitipant,
    true
  )
  return (
    <form action={handleParticipant}>
      {isParicipantState ? (
        <Button type="submit" className="bg-white border border-vieolet-500 rounded-full w-full text-violet-500 py-7 text-[18px] cursor-pointer hover:opacity-70">この対戦から退出する</Button>
      ):(
        <Button type="submit" className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70">この対戦に参加する</Button>
      )}
    </form>
    
  )
}

export default ParticipantButton
