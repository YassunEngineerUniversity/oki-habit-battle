import { AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Avatar } from "@radix-ui/react-avatar"
import Image from "next/image"
import Link from "next/link"
import { MdArrowForwardIos } from "react-icons/md"

interface ProfileCardProps {
  user: User
}

const ProfileCard = ({user}: ProfileCardProps) => {
  return (
    <div className="py-4 px-4 border border-gray-200 rounded-lg block">
      <Link href="/profile/settings" className="flex gap-2 items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-[70px] h-[70px]">
            {user.image_url ? (
              <AvatarImage src={user.image_url} alt="avatar" className="rounded-full" />
            ): (
              <AvatarFallback className="rounded-full">
                <Image src="/images/icon/no-avatar.png" className="rounded-full" width={70} height={70} alt="no-avatar"/>
              </AvatarFallback>
            )}
          </Avatar>
          <h1>{user.name}</h1>
        </div>
        <MdArrowForwardIos  className="w-4 h-4 text-gray-400"/>
      </Link>
      <div className="mt-4">
        <p className="text-sm">{user.profile}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm font-bold ">マイハビバトポイント</span>
        <span className="text-sm font-bold mt-[-2px] block"><span className="text-lg font-bold inline-block mr-1">{user.reword_total}</span>&nbsp;P</span>
      </div>
    </div>
  )
}

export default ProfileCard