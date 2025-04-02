import BattleItem from "@/components/utils/battle/BattleItem"
import { FaFire, FaHourglassHalf } from "react-icons/fa6"

const Index = () => {
  const battles = [
    {
      id: 1,
      title: "test",
      detail: "testtesttesttesttesttesttesttesttesttesttest",
      image: "https://www.pokemon.co.jp/ex/oras/pokemon/img/page25/img_01.png",
      level: "AAA",
      status: "test",
      created_at: "test",
      updated_at: "test",
      host_user_id: 1,
      participants: [
        {
          user_id: 1,
          name: "test",
          avatar: "https://iconbu.com/wp-content/uploads/2020/01/%E3%83%9A%E3%83%B3%E3%82%AE%E3%83%B3%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3.jpg",
        }
      ]
    },
    {
      id: 2,
      title: "test",
      detail: "testtesttesttesttesttest",
      image: "https://www.pokemon.co.jp/ex/oras/pokemon/img/page25/img_01.png",
      level: "AAA",
      status: "test",
      created_at: "test",
      updated_at: "test",
      host_user_id: 1,
      participants: [
        {
          user_id: 1,
          name: "test",
          avatar: "https://iconbu.com/wp-content/uploads/2020/01/%E3%83%9A%E3%83%B3%E3%82%AE%E3%83%B3%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3.jpg",
        }
      ]
    },
    {
      id: 3,
      title: "test",
      detail: "testtesttesttesttesttesttesttest",
      image: "",
      level: "AAA",
      status: "test",
      created_at: "test",
      updated_at: "test",
      host_user_id: 1,
      participants: [
        {
          user_id: 1,
          name: "test",
          avatar: "https://iconbu.com/wp-content/uploads/2020/01/%E3%83%9A%E3%83%B3%E3%82%AE%E3%83%B3%E3%81%AE%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3.jpg",
        }
      ]
    }
  ]


  return (
    <div>
      <div>
        <div className="flex justify-center gap-1 mb-2">
          <h2 className="text-lg font-bold">対戦中</h2>
          <FaFire className="text-red-500 w-[24px] h-[24px]"/>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {battles.map((battle) => 
            <li className="" key={battle.id}>
              <BattleItem battle={battle}/>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-[60px]">
        <div className="flex justify-center gap-1 mb-2">
          <h2 className="text-lg font-bold">対戦待ち</h2>
          <FaHourglassHalf className="text-teal-500 w-[24px] h-[24px]"/>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {battles.map((battle) => 
            <li className="" key={battle.id}>
              <BattleItem battle={battle}/>
            </li>
          )}
        </ul>
      </div>

    </div>
  )
}

export default Index