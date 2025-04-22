"use client"

import { Button } from '@/components/ui/button'
import { logout } from '@/server/actions/logout/action';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    const response = await logout();

    if (response && response.success) {
      router.push("/login");
    } else {
      toast.error(response?.message, { style: { background: "#dc2626", color: "#fff" }});
    }
  };

  return (
    <div>
      <Button onClick={handleLogout} className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">ログアウトする</Button>
    </div>
  )
}

export default LogoutButton
