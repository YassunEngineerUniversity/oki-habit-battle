"use client"

import { useState } from "react"
import { HiOutlineMenu } from "react-icons/hi";
import { Button } from "@/components/ui/button"
import { IoCloseSharp } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import Link from "next/link";
import { RiSwordLine } from "react-icons/ri";

interface HamburgerMenuProps {
  battleId: string | undefined
}

const HamburgerMenu = ({battleId}: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="absolute top-0 right-2 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer mt-1 h-10 w-10"
          onClick={toggleMenu}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? <IoCloseSharp width={28} height={28} /> : <HiOutlineMenu width={28} height={28}  />}
        </Button>
      </div>
      <div className={`w-full max-w-[375px] fixed top-0 left-0 right-0 m-auto inset-x-0 top-[48px] border-b border-gray-200 bg-white transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <nav className="px-7 py-4">
          <ul className="flex gap-9">
            <li className="">
              <Link href={`/battles/${battleId}/active`} className="flex flex-col items-center gap-[6px]">
              <RiSwordLine />
                <span className="text-sm">対戦</span>
              </Link>
            </li>
            <li className="">
              <Link href={`/battles/${battleId}`} className="flex flex-col items-center gap-[6px]">
                <BiDetail />
                <span className="text-sm">詳細</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default HamburgerMenu
