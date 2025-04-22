"use client"

import { Button } from '@/components/ui/button'
import { useToggle } from '@/hooks/useToggle'
import { createParticipant, deleteParticipant } from '@/server/actions/participant/actions'

interface ParticipantButtonProps {
  isParticipant: boolean,
  battleId: number
}

const ParticipantButton = ({battleId, isParticipant}: ParticipantButtonProps) => {
  const {isToggle: isParicipantState, toggle: handleParticipant} = useToggle({
    state: isParticipant,
    on: () => createParticipant.bind(null, battleId.toString()),
    off: () => deleteParticipant.bind(null, battleId.toString()),
    isSuccessToast: true,
  })
  
  return (
    <form action={handleParticipant}>
      {isParicipantState ? (
        <Button type="submit" className="bg-white border border-vieolet-500 rounded-full w-full text-violet-500 py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-white">この対戦から退出する</Button>
      ):(
        <Button type="submit" className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">この対戦に参加する</Button>
      )}
    </form>
    
  )
}

export default ParticipantButton
