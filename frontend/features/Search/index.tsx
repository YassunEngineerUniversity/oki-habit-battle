import { callApi } from "@/utils/callApi";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./components/SearchBar";

const Index = async () => {
  const categories = await callApi("/battle-categories", {
    method: "GET",
  })

  return (
    <div className="pt-3 pb-[120px]">
      <div className="fixed max-w-[375px] w-full top-3 left-0 right-0 m-auto z-10">
        <SearchBar />
      </div>
      <div className="mt-4 pt-10">
        <h2 className="text-sm">カテゴリーから対戦を選ぶ</h2>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-[10px] gap-y-3 pb-6">
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