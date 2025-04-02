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
    <div className="w-full">
      <div className="relative w-full">
        {backLink? (
          <Link href={backLink} className="absolute top-5 left-2 flex block cursor-pointer"> 
            <MdArrowBackIos width={48} height={48}  className="w-5 h-5 block"/>
          </Link>
        ): (
          <Link href="/profile" className="absolute top-2 -left-1 flex block cursor-pointer"> 
            {profile ? (
              <Image src={profile} className="rounded-full" width={48} height={48} alt="profile"/>
            ) : (
              <Image src="/images/icon/non-profile-icon.png" className="rounded-full" width={48} height={48} alt="profile"/>
            )}
          </Link>
        )}
        <h1 className="text-center font-bold text-xl pt-4">{ title }</h1>
      </div>
    </div>
  )
}

export default PageHeader