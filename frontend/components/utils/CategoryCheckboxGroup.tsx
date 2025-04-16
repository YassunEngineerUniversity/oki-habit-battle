"use client"

import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { cn } from "@/lib/utils"

interface CategoryCheckboxGroup {
  id: number
  name: string
  isChecked: boolean
}

interface CategoryArray {
  name: string
}

interface CategoryCheckboxGroupProps {
  categories: CategoryCheckboxGroup[]
  onChange?: (selectedCategories: CategoryArray[]) => void
  className?:string
}

const CategoryCheckboxGroup = ({categories, className, onChange}: CategoryCheckboxGroupProps) => {
  const [categoriesState, setCategoriesState] = useState<CategoryCheckboxGroup[]>(categories)

  const toggleCategory = (categoryName: string) => {
    setCategoriesState((prevState) => {
      const updatedState = prevState.map((category) => {
        if (category.name === categoryName) {
          return { ...category, isChecked: !category.isChecked }
        }
        return category
      })

      const selectedCategory = updatedState.filter((category) => category.isChecked).map((category) => {
        return {
          name: category.name,
        }
      })
      if(selectedCategory.length > 0) {
        onChange?.(selectedCategory)
      }

      return updatedState
    })
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category, index) => {
        return (
          <label
            key={category.id}
            className={cn(
              "flex items-center justify-center px-4 py-2 rounded-md border cursor-pointer transition-colors",
              "hover:bg-muted/50",
              categoriesState[index].isChecked
                ? "bg-violet-500 text-white border-violet-500"
                : "bg-background border-violet-500 text-violet-500 text-base",
            )}
          >
            <Checkbox
              id={category.id.toString()}
              checked={categoriesState[index].isChecked}
              onCheckedChange={() => toggleCategory(category.name)}
              className="sr-only"
              defaultChecked={categoriesState[index].isChecked}
            />
            <span>{category.name}</span>
          </label>
        )
      })}
    </div>
  )
}

export default CategoryCheckboxGroup
