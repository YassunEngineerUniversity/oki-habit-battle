"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { MdHistory, MdHome, MdSearch } from "react-icons/md";

const PageFooter = () => {
  const pathname = usePathname();

  const content = [
    {
      href: "/",
      icon: "home",
      text: "ホーム"
    },
    {
      href: "/battle/search",
      icon: "search",
      text: "対戦検索"
    },
    {
      href: "/battle/history",
      icon: "history",
      text: "戦歴"
    }
  ]

  return (
    <footer className="w-full max-w-[375px] fixed bottom-0 left-0 right-0 m-auto bg-white z-10 border-t border-gray-200">
      <div className="flex justify-around items-center py-3">
        {content.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center">
            {item.icon === "home" && (
              <MdHome className={`text-xl ${pathname === item.href ? "text-violet-500" : ""}`}/>
            )}
            {item.icon === "search" && (
              <MdSearch className={`text-xl ${pathname === item.href ? "text-violet-500" : ""}`}/>
            )}
            {item.icon === "history" && (
              <MdHistory className={`text-xl ${pathname === item.href ? "text-violet-500" : ""}`}/>
            )}
            <span className={`text-xs mt-1 ${pathname === item.href ? "text-violet-500 font-bold" : ""}`}>
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default PageFooter