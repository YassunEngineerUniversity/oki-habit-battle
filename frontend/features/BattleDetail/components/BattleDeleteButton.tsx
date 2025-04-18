"use client"

import { Button } from "@/components/ui/button";
import { deleteBattle } from "@/server/actions/battle/deleteBattle";


import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BattleDeleteButtonProps {
  battleId: string;
}

const BattleDeleteButton = ({battleId}:BattleDeleteButtonProps) => {
  const router = useRouter()
  const handleDelete = async () => {
    const response = await deleteBattle(battleId)

    if(response?.success) {
      toast.success("対戦を削除しました", { style: { background: "#4ade80", color: "#fff" }})
      router.push("/")
    } else {
      toast.error(response?.message, { style: { background: "#dc2626", color: "#fff" }})
    }
  }

  return (
    <form action={handleDelete}>
      <Button type="submit" className="bg-red-500 border border-red-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-red-500">この対戦を削除する</Button>
    </form>
  )
}

export default BattleDeleteButton
