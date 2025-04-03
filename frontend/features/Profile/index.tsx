import ProfileCard from "./components/ProfileCard";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";

interface ProfileProps {
  user: User
}

const index = async ({user}: ProfileProps) => {

  const PROFILECONTENT = [
    {
      title: "獲得したスタンプ",
      Link: "/stamps",
    },
    {
      title: "お気に入りの対戦",
      Link: "/favorites",
    },
    {
      title: "利用規約",
      Link: "/terms",
    },
    {
      title: "プライバシーポリシー",
      Link: "/privacy",
    },
    {
      title: "お問い合わせ",
      Link: "/contact",
    },
    {
      title: "退会",
      Link: "/withdrawal",
    },
    {
      title: "ログアウト",
      Link: "/logout",
    },
  ]

  return (
    <div>
      <ProfileCard user={user}/>
      <ul className="grid grid-cols-1 gap-3 mt-3">
        {PROFILECONTENT.map((content, index) => (
          <li key={index} className="py-4 px-4 border border-gray-200 rounded-lg block">
            <Link href={content.Link} className="flex items-center gap-2 justify-between cursor-pointer">
              <span className="text-base">{content.title}</span>
              <MdArrowForwardIos className="w-4 h-4 text-gray-400"/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default index;