"use client";

import { Button } from "@/components/ui/button";
import { createFavorite, deleteFavorite } from "@/server/actions/favorite/action";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { toast } from "sonner"

interface FavoriteButtonProps {
  isFavorite: boolean;
  battleId: number;
}

const FavoriteButton = ({isFavorite, battleId}:FavoriteButtonProps) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const handleCreateFavorite = createFavorite.bind(null, battleId.toString());
  const handleDeleteFavorite = deleteFavorite.bind(null, battleId.toString());

  const handleFavorite = async () => {
    if (isFavoriteState) {
      const response = await handleDeleteFavorite();

      if(response?.success !== undefined && !response.success) {
        toast.error(response.message, { style: { background: "#dc2626", color: "#fff" }});
      } else {
        setIsFavoriteState(false);
      }
    } else {
      const response = await handleCreateFavorite();
      
      if(response?.success !== undefined && !response.success) {
        toast.error(response.message, { style: { background: "#dc2626", color: "#fff" }});
      } else {
        setIsFavoriteState(true);
      }
    }
  }

  return (
    <form action={handleFavorite}>
      {isFavoriteState ? (
        <Button type="submit" className="bg-white border border-amber-400 rounded-full w-full text-white flex justify-center gap-1 cursor-pointer hover:opacity-70">
          <span className="text-amber-400">お気に入りを解除</span>
          <FaStar className="w-3 block mt-[-2px] text-amber-400"/>
        </Button>
      ):(
        <Button type="submit" className="bg-amber-400 rounded-full w-full text-white flex justify-center gap-1 cursor-pointer hover:opacity-70">
          <span>お気に入りに追加</span>
          <FaRegStar className="w-3 block mt-[-2px]"/>
        </Button>
      )}
    </form>
  )
}

export default FavoriteButton
