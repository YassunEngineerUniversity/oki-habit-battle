"use clinet";

import { Button } from "@/components/ui/button";
import { FaRegStar } from "react-icons/fa6";

const FavoriteButton = () => {
  
  return (
    <>
      <Button className="bg-amber-400 border border-vieolet-500 rounded-full w-full text-white flex justify-center gap-1 cursor-pointer hover:opacity-70">
        <span>お気に入りに追加</span>
        <FaRegStar className="w-3 block mt-[-2px]"/>
      </Button>
    </>
  )
}

export default FavoriteButton
