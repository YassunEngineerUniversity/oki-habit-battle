import Link from "next/link"

const BattleCreateButton = () => {
  return (
    <Link href="/battle/create" className="block w-full bg-violet-500 border border-vieolet-500 rounded-full text-white py-3 px-6 text-[18px] cursor-pointer hover:opacity-70">
      対戦を作成
    </Link>
  )
}

export default BattleCreateButton
