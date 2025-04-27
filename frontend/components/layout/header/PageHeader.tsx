import { Avatar, AvatarImage } from "@/components/ui/avatar";
import HamburgerMenu from "@/components/utils/HamburgerMenu";
import { AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { RiSwordLine } from "react-icons/ri";

interface PageHeaderProps {
  title: string;
  profile?: string;
  backLink?: string;
  isHumburger?: boolean;
  battleId?: string;
}

const PageHeader = ({title, profile, backLink, isHumburger, battleId}: PageHeaderProps) => {
  return (
    <div className="w-full max-w-[375px] fixed top-0 left-0 right-0 m-auto bg-white z-10 border-b border-gray-200">
      <div className="relative w-full">
        {backLink? (
          <Link href={backLink} className="absolute top-4 left-3 flex block cursor-pointer"> 
            <MdArrowBackIos width={16} height={16}  className="w-4 h-4 block"/>
          </Link>
        ): (
          <Link href="/profile" className="absolute top-[7px] left-3 flex block cursor-pointer"> 
            <Avatar className="w-8 h-8">
              {profile ? (
                <AvatarImage src={profile} alt="avatar" className="rounded-full" />
              ) : (
                <AvatarFallback className="rounded-full">
                  <Image src="/images/icon/no-avatar.png" className="rounded-full" width={32} height={32} alt="no-avatar"/>
                </AvatarFallback>
              )}
            </Avatar>
          </Link>
        )}
        <h1 className="text-center font-bold text-[15px] pt-3 pb-3">{ title }</h1>
        {isHumburger && <HamburgerMenu battleId={battleId}/> }
      </div>
      {title === "ホーム" && (
        <Link href={"/battles/create"} className="absolute top-[9px] right-4">
          <RiSwordLine className="w-7 h-7"/>
        </Link>
      )}
    </div>
  )
}

export default PageHeader