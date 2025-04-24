"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MdArrowForwardIos } from "react-icons/md"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { useState } from "react"

const FilterBattleArea = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [levelValues, setLevelValues] = useState<string[]>([])
  const [orderRadioValue, setOrderRadioValue] = useState("desc")
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryParams = searchParams.get("category")
  const titleParams = searchParams.get("title")
  const levelParams = searchParams.get("level")
  const orderParams = searchParams.get("order")
  const queryParams = searchParams.get("q")

  const router = useRouter()

  const LEVELS = [
    { label: "SSS", value: "SSS" },
    { label: "SS", value: "SS" },
    { label: "S", value: "S" },
    { label: "AAA", value: "AAA" },
    { label: "AA", value: "AA" },
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
  ]

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleFileter = () => {
    let queryString = ""
    if (categoryParams) {
      queryString += `category=${categoryParams}`
    }
    if (titleParams) {
      queryString += `&title=${titleParams}`
    }
    if (queryParams) {
      queryString += `&q=${queryParams}`
    }
    if (levelValues.length > 0 || levelParams) {
      queryString += `&level=${levelValues.join(",")}`
    }
    if (orderRadioValue || orderParams) {
      queryString += `&order=${orderRadioValue}`
    }

    router.push(
      `${pathname}?${queryString.slice(1)}`
    )
  }

  return (
    <>
      <div onClick={handleOpen} className="flex gap-2 items-center cursor-pointer">
        <span className="text-base">絞り込み</span>
        <MdArrowForwardIos />
      </div>
      <div 
        className={`fixed bottom-[64px] left-0 right-0 bg-white border border-gray-300 rounded-lg z-10 min-h-[300px] px-6 py-5 max-w-[375px] w-full m-auto transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div>
          <span className="block text-center mb-5">絞り込み</span>
          <div className="grid grid-cols-5 gap-x-2 gap-y-4">
            {LEVELS.map((level) => (
              <div key={level.label} className="flex items-center space-x-2">
                <Checkbox
                  checked={levelValues.includes(level.value)}
                  onCheckedChange={
                    (checked) => {
                      if (checked) {
                        setLevelValues((prev) => [...prev, level.value])
                      } else {
                        setLevelValues((prev) =>
                          prev.filter((value) => value !== level.value)
                        )
                      }
                    }
                  }
                  className="
                    w-5 h-5 rounded border border-gray-300 cursor-pointer 
                    bg-white
                    data-[state=checked]:bg-violet-500 
                    data-[state=checked]:border-violet-500
                    transition-colors
                  "
                />
                <label
                  className="text-base font-medium bg-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {level.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <span className="block text-center">表示順</span>
          <RadioGroup
            onValueChange={(value) => setOrderRadioValue(value)}
            defaultValue={orderRadioValue}
            className="flex space-x-4 items-center justify-center mt-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="desc" 
                id="desc" 
                className={`
                  h-4 w-4 rounded-full border border-gray-300 bg-white cursor-pointer
                  transition-colors
                  text-violet-500 [&_svg]:fill-violet-500
                `}
              />
              <Label htmlFor="desc" className="flex items-center">
                作成日降順
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem 
                value="asc" 
                id="asc" 
                className={`
                  h-4 w-4 rounded-full border border-gray-300 bg-white cursor-pointer
                  transition-colors
                  text-violet-500 [&_svg]:fill-violet-500
                `}
              />
              <Label htmlFor="asc" className="flex items-center">
                作成日昇順
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="mt-8">
          <Button onClick={handleFileter} className="bg-violet-500 border border-violet-500 rounded-full w-full text-white py-6 text-base cursor-pointer hover:opacity-70 hover:bg-violet-500">
            絞り込む
          </Button>
        </div>
      </div>
    </>
  )
}

export default FilterBattleArea
