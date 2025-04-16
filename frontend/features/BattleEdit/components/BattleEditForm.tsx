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
import { createPeriodISOS, createPeriodISOSToMinutes } from "@/lib/createPeriod";
import { formatDate, formatDateTime, formatPeriod } from "@/lib/formatDate";
import { BattleFormData } from "@/schema/battle/schema";
import { updateBattle } from "@/server/actions/battle/actions";
import { BattleDetail } from "@/types/battle/types";
import { Category } from "@/types/category/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { IoIosCamera } from "react-icons/io";
import { toast } from "sonner";

interface BattleEditFormProps {
  battle: BattleDetail
  categories: Category[]
}

const BattleEditForm = ({battle, categories}:BattleEditFormProps) => {
  const router = useRouter()
  const [preview, setPreview] = useState<string | null>(battle.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BattleFormData>()
  const { register, setValue, formState: { errors } } = form

  const categoriesCheckGroup = categories.map((category) => {
    if(battle.categories.some((selectedCategory) => selectedCategory.id === category.id)) {
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
  
  const onSubmit = async (data: BattleFormData) => {
    const formData = new FormData()
    data.title && formData.append("title", data.title)
    data.participants && formData.append("participant_limit", data.participants)
    data.achievementRate && formData.append("achievement_rate", data.achievementRate)
    data.detail && formData.append("detail", data.detail)

    if(data.categories && data.categories.length > 0) {
      for (let index = 0; index < data.categories.length; index++) {
        formData.append("categories[][name]", data.categories[index].name)
      }
    }

    data.backgroundImage && formData.append("background_image", data.backgroundImage)

    const respose = await updateBattle(formData, battle.id.toString())

    if(respose?.success) {
      toast.success("対戦を編集しました", { style: { background: "#4ade80", color: "#fff" }})
      router.push(`/battles/${battle.id}`)
    } else {
      toast.error(respose?.message, { style: { background: "#dc2626", color: "#fff" }})
    }
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
        defaultValue={battle.title}
        {...register("title")}
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
            <Select defaultValue={battle.participant_limit.toString()}  onValueChange={(value) => setValue("participants", value)}>
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
      <div className="flex justify-between items-center">
        <span className="text-sm">募集締切日</span>
        <span className="text-sm">{formatDateTime(battle.apply_end_date)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">対戦期間</span>
        <span className="text-sm">{formatPeriod(battle.battle_start_date, battle.battle_end_date)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">対戦開始日</span>
        <span className="text-sm">{formatDate(battle.battle_start_date)}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm">対戦終了日</span>
        <span className="text-sm">{formatDate(battle.battle_end_date)}</span>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm">達成率</span>
          </div>
          <div>
            <Select defaultValue={battle.achievement_rate.toString()} onValueChange={(value) => setValue("achievementRate", value)}>
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
        {errors.achievementRate && <p className="text-red-500 text-sm mt-2">{errors.achievementRate.message}</p>}
      </div>
      <div>
        <Label className="text-sm mb-1 block">対戦詳細</Label>
        <Textarea
          id="detail"
          defaultValue={battle.detail}
          {...register("detail")}
          className="border-gray-200 focus-visible:ring-violet-500 py-4 min-h-[300px]"
          placeholder="対戦の詳細を記入してください"
        />
        {errors.detail && <p className="text-red-500 text-sm mt-2">{errors.detail.message}</p>}
      </div>
      <div>
        <Button type="submit" className="bg-violet-500 border border-vieolet-500 rounded-full w-full text-white py-7 text-[18px] cursor-pointer hover:opacity-70">対戦を編集する</Button>
      </div>
    </form>
  )
}

export default BattleEditForm
