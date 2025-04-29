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
import CategoryCheckboxGroup from "@/components/utils/CategoryCheckboxGroup";
import { BattleFormData } from "@/schema/battle/schema";
import { Category } from "@/types/category/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoIosCamera } from "react-icons/io";

interface BattleFormProps {
  categories: Category[]
}

const BattleForm = ({categories}:BattleFormProps) => {
  const form = useFormContext<BattleFormData>()
  const { register, setValue, formState: { errors } } = form

  const router = useRouter()
  const backgroundImageUrl = form.getValues("backgroundImage")? URL.createObjectURL(form.getValues("backgroundImage")) : null
  const [preview, setPreview] = useState<string | null>(backgroundImageUrl)
  const fileInputRef = useRef<HTMLInputElement>(null);


  const categoriesCheckGroup = categories.map((category) => {
    if(form.getValues("categories")?.some((selectedCategory) => selectedCategory.name === category.name)) {
      return {
        id: category.id,
        name: category.name,
        isChecked: true,
      }
    }

    return {
      id: category.id,
      name: category.name,
      isChecked: false,
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
      setValue("backgroundImage", file)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }
  
  const onSubmit = ():void => {
    router.push("/battles/confirm")
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 px-2">
      <div>
      <Label className="text-sm mb-1 block">対戦タイトル</Label>
      <Input
        id="title"
        className="border-gray-200 focus-visible:ring-violet-500 py-5" 
        type="text" 
        placeholder="タイトルを入力してください"
        {...register("title")}
        defaultValue={form.getValues("title")}
      />
      {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>}
      </div>
      <div>
        <span className="text-sm">カテゴリー</span>
        <div className="mt-2">
          <CategoryCheckboxGroup 
            categories={categoriesCheckGroup} 
            onChange={(selectedCategories) => {
            setValue("categories", selectedCategories)
          }}
          />
        </div>
       {Array.isArray(errors.categories) && errors.categories.map((error, index) => (
         <p key={index} className="text-red-500 text-sm mt-2">{error.name?.message}</p>
       ))}
      </div>
      <div>
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
              <Image src={preview} className="rounded-md object-contain" width={100} height={100} alt="battle create image" unoptimized/>
            ):(
              <Image src="/images/no-image.jpg" className="rounded-md" width={100} height={100} alt="no-image"/>
            )}
            <div className="absolute bottom-1 right-1 bg-black/50 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
              <IoIosCamera  className="w-4 text-white"/>
            </div>
            </Button>
            <Input
            id="backgroundImage"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            type="file"
            accept="image/*"
            />
          </div>
        </div>
        {errors.backgroundImage && <p className="text-red-500 text-sm mt-2">{errors.backgroundImage.message}</p>}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">参加人数</span>
          </div>
          <div>
            <Select defaultValue={form.getValues("participants")} onValueChange={(value) => setValue("participants", value)}>
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
        {errors.participants && <p className="text-red-500 text-sm mt-2">{errors.participants.message}</p>}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">募集期間</span>
          </div>
          <div>
            <Select defaultValue={form.getValues("applyPeriod")} onValueChange={(value) => setValue("applyPeriod", value)}>
              <SelectTrigger className="w-[160px] border-gray-200 focus-visible:ring-violet-500">
              <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent className="border-gray-200 bg-white">
              <SelectGroup>
                <SelectLabel>募集期間</SelectLabel>
                <SelectItem value="3">3分</SelectItem>
                <SelectItem value="15">15分</SelectItem>
                <SelectItem value="30">30分</SelectItem>
                <SelectItem value="45">45分</SelectItem>
                <SelectItem value="60">60分</SelectItem>
                <SelectItem value="120">2時間</SelectItem>
                <SelectItem value="240">4時間</SelectItem>
                <SelectItem value="360">6時間</SelectItem>
                <SelectItem value="720">12時間</SelectItem>
                <SelectItem value="1440">1日</SelectItem>
                <SelectItem value="2880">2日</SelectItem>
                <SelectItem value="4320">3日</SelectItem>
                <SelectItem value="5760">4日</SelectItem>
                <SelectItem value="7200">5日</SelectItem>
                <SelectItem value="8640">6日</SelectItem>
                <SelectItem value="10080">7日</SelectItem>
              </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        {errors.applyPeriod && <p className="text-red-500 text-sm mt-2">{errors.applyPeriod.message}</p>}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">対戦期間</span>
          </div>
          <div>
          <Select defaultValue={form.getValues("battlePeriod")} onValueChange={(value) => setValue("battlePeriod", value)}>
            <SelectTrigger className="w-[160px] border-gray-200 focus-visible:ring-violet-500">
            <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent className="border-gray-200 bg-white">
            <SelectGroup>
              <SelectLabel>対戦期間</SelectLabel>
              <SelectItem value="1440">1日</SelectItem>
              <SelectItem value="2880">2日</SelectItem>
              <SelectItem value="4320">3日</SelectItem>
              <SelectItem value="5760">4日</SelectItem>
              <SelectItem value="7200">5日</SelectItem>
              <SelectItem value="8640">6日</SelectItem>
              <SelectItem value="10080">7日</SelectItem>
            </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        </div>
        {errors.battlePeriod && <p className="text-red-500 text-sm mt-2">{errors.battlePeriod.message}</p>}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">達成率</span>
          </div>
          <div>
            <Select defaultValue={form.getValues("achievementRate")} onValueChange={(value) => setValue("achievementRate", value)}>
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
        <span className="text-[12px] block mt-3">※対戦期間のうち週にどのくらい習慣を行うかを設定します。</span>
        {errors.achievementRate && <p className="text-red-500 text-sm mt-2">{errors.achievementRate.message}</p>}
      </div>
      <div>
        <Label className="text-sm mb-1 block">対戦詳細</Label>
        <Textarea
          id="detail"
          defaultValue={form.getValues("detail")}
          {...register("detail")}
          className="border-gray-200 focus-visible:ring-violet-500 py-4 min-h-[300px]"
          placeholder="対戦の詳細を記入してください"
        />
        {errors.detail && <p className="text-red-500 text-sm mt-2">{errors.detail.message}</p>}
      </div>
      <div>
        <Button type="submit" className="bg-violet-500 border border-violet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70 hover:bg-violet-500">対戦を作成する</Button>
      </div>
    </form>
  )
}

export default BattleForm
