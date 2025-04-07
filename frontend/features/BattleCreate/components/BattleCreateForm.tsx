"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";
import { createBattle } from "@/server/actions/battle/actions";
import Image from "next/image";
import { useActionState, useRef, useState } from "react";
import { IoIosCamera } from "react-icons/io";

interface BattleCreateFormProps {
  categories: Category[]
}

const INITIALSTATE = {
  title: "",
  category: "",
  image: "",
}

const BattleCreateForm = ({categories}:BattleCreateFormProps) => {
  const [state, formAction, isPending] = useActionState(createBattle, INITIALSTATE);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <form action={formAction} className="grid gap-6 px-2">
      <div>
        <Label className="text-sm mb-1 block">対戦タイトル</Label>
        <Input
          id="title"
          name="title"
          className="border-gray-200 focus-visible:ring-violet-500 py-5" 
          type="text" 
          placeholder="タイトルを入力してください"
          autoComplete="email"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">カテゴリー</span>
        </div>
        <div>
        <Select name="category">
          <SelectTrigger className="w-[180px] border-gray-200 focus-visible:ring-violet-500">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-white">
            <SelectGroup>
              <SelectLabel>カテゴリー</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">画像</span>
        </div>
        <div>
          <Button
            onClick={handleFileClick} 
            className="w-[100px] h-[100px] relative rounded-full cursor-pointer block shadow-none border-none p-0"
            type="button"
          >
            {preview? (
              <Image src={preview} className="rounded-md object-contain" width={100} height={100} alt="battle create image"/>
            ):(
              <Image src="/images/no-image.jpg" className="rounded-md" width={100} height={100} alt="no-image"/>
            )}
            <div className="absolute bottom-1 right-1 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
              <IoIosCamera  className="w-4 text-white"/>
            </div>
          </Button>
          <Input
            id="image"
            name="image"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            type="file"
            accept="image/*"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">参加人数</span>
        </div>
        <div>
        <Select>
          <SelectTrigger className="w-[160px] border-gray-200 focus-visible:ring-violet-500">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-white">
            <SelectGroup>
              <SelectLabel>参加人数</SelectLabel>
              <SelectItem value="1">1人</SelectItem>
              <SelectItem value="2">2人</SelectItem>
              <SelectItem value="3">3人</SelectItem>
              <SelectItem value="4">4人</SelectItem>
              <SelectItem value="5">5人</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">募集期間</span>
        </div>
        <div>
        <Select>
          <SelectTrigger className="w-[160px] border-gray-200 focus-visible:ring-violet-500">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-white">
            <SelectGroup>
              <SelectLabel>募集期間</SelectLabel>
              <SelectItem value="1">1日</SelectItem>
              <SelectItem value="2">2日</SelectItem>
              <SelectItem value="3">3日</SelectItem>
              <SelectItem value="4">4日</SelectItem>
              <SelectItem value="5">5日</SelectItem>
              <SelectItem value="6">6日</SelectItem>
              <SelectItem value="7">7日</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">対戦期間</span>
        </div>
        <div>
        <Select>
          <SelectTrigger className="w-[160px] border-gray-200 focus-visible:ring-violet-500">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-white">
            <SelectGroup>
              <SelectLabel>対戦期間</SelectLabel>
              <SelectItem value="1">1日</SelectItem>
              <SelectItem value="2">2日</SelectItem>
              <SelectItem value="3">3日</SelectItem>
              <SelectItem value="4">4日</SelectItem>
              <SelectItem value="5">5日</SelectItem>
              <SelectItem value="6">6日</SelectItem>
              <SelectItem value="7">7日</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm">達成率</span>
        </div>
        <div>
        <Select>
          <SelectTrigger className="w-[160px] border-gray-200 focus-visible:ring-violet-500">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent className="border-gray-200 bg-white">
            <SelectGroup>
              <SelectLabel>達成率</SelectLabel>
              <SelectItem value="50">50%</SelectItem>
              <SelectItem value="60">60%</SelectItem>
              <SelectItem value="70">70%</SelectItem>
              <SelectItem value="80">80%</SelectItem>
              <SelectItem value="90">90%</SelectItem>
              <SelectItem value="100">100%</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>
      <div>
        <Label className="text-sm mb-1 block">対戦詳細</Label>
        <Textarea
          id="profile"
          name="profile"
          className="border-gray-200 focus-visible:ring-violet-500 py-4 min-h-[300px]"
          placeholder="対戦の詳細を記入してください"
        />
      </div>
      <div>
        <Button type="submit" className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70">対戦を作成する</Button>
      </div>
    </form>
  )
}

export default BattleCreateForm
