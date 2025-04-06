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
      <Button onClick={handleLogout} className="w-full py-6 bg-violet-500 text-base text-white mt-6 cursor-pointer hover:opacity-80">ログアウトする</Button>
    </div>
  )
}

export default LogoutButton
