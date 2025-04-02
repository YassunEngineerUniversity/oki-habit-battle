import Image from "next/image";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";

interface PageHeaderProps {
  title: string;
  profile: string;
  backLink?: string;
}

const PageHeader = ({title, profile, backLink}: PageHeaderProps) => {
  return (
    <div className="w-full max-w-[375px] fixed top-0 left-0 right-0 m-auto bg-white z-10 border-b border-gray-200">
      <div className="relative w-full">
        {backLink? (
          <Link href={backLink} className="absolute top-4 left-3 flex block cursor-pointer"> 
            <MdArrowBackIos width={16} height={16}  className="w-4 h-4 block"/>
          </Link>
        ): (
          <Link href="/profile" className="absolute top-[6px] left-3 flex block cursor-pointer"> 
            {profile ? (
              <Image src={profile} className="rounded-full" width={32} height={32} alt="profile"/>
            ) : (
              <Image src="/images/icon/no-avater.png" className="rounded-full" width={32} height={32} alt="profile"/>
            )}
          </Link>
        )}
        <h1 className="text-center font-bold text-[15px] pt-3 pb-3">{ title }</h1>
      </div>
    </div>
  )
}

export default PageHeader