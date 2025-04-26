import Link from "next/link"
import { FaPlus } from "react-icons/fa6"

const BattleCreateButton = () => {
  return (
    <Link href="/battles/create" className="flex items-center justify-center gap-2 w-full bg-violet-500 border border-violet-500 rounded-full text-white py-3 pl-4 pr-6 text-[18px] cursor-pointer hover:opacity-80 hover:bg-violet-500">
      <FaPlus />
      <span>対戦を作成</span>
    </Link>
  )
}

export default BattleCreateButton
