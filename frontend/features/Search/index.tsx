import { Input } from "@/components/ui/input";
import { callApi } from "@/utils/callApi";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const Index = async () => {
  const categories = await callApi("/battle-categories", {
    method: "GET",
  })

  return (
    <div className="pt-3">
      <form>
        <div className="relative w-full">
          <FaSearch className="absolute top-[11px] left-3 w-5 h-5 text-gray-300" />
          <Input
            id="search"
            name="search"
            className="border-gray-200 focus-visible:ring-violet-500 py-5 pl-10" 
            type="text" 
            placeholder="対戦検索"
          />
        </div>
      </form>
      <div className="mt-4">
        <h2 className="text-sm">カテゴリーから対戦を選ぶ</h2>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-[10px] gap-y-3">
        {categories?.data.map((category: Category) => 
          <li key={category.id} className="border border-gray-200 rounded-lg py-2 px-1">
            <Link href={`/battles/search/category/?category=${category.query}&title=${category.name}`} className="block cursor-pointer flex items-center gap-2 ">
              <div>
                {category.image_url ? (
                  <Image src={category.image_url} width={50} height={50} className="rounded-sm" alt="battle-image" unoptimized/>
                ) : (
                  <Image src="/images/no-image.jpg" width={50} height={50} className="rounded-sm" alt="no-image"/>
                )}
              </div>
              <span className="text-sm">{category.name}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
export default Index;