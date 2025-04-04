"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { IoCloseCircle } from 'react-icons/io5'

const SearchBar = () => {
  const [searchWord, setSearchWord] = useState<string>("")
  const [isDeleteWordVisible, setIsDeleteWordVisible] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const word = e.target.value

    if(word.length > 0) {
      setIsDeleteWordVisible(true)
    } else {
      setIsDeleteWordVisible(false)
    }

    setSearchWord(word)
  }

  const handleDeleteWordClick = () => {
    setSearchWord("")
    setIsDeleteWordVisible(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchWord.length > 0) {
      router.push(`/battles/search/word?q=${searchWord}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative w-full">
        <FaSearch className="absolute top-[11px] left-3 w-5 h-5 text-gray-300" />
        <Input
          id="search"
          name="search"
          className="border-gray-200 focus-visible:ring-violet-500 py-5 pl-10" 
          type="text"
          placeholder="検索ワードを入力してください"
          value={searchWord}
          onChange={handleChange}
        />
        {isDeleteWordVisible && (<IoCloseCircle onClick={handleDeleteWordClick}  className="absolute top-[11px] right-3 w-5 h-5 cursor-pointer"/>)}
      </div>
      <Button type="submit" className="hidden"></Button>
    </form>
  )
}

export default SearchBar
