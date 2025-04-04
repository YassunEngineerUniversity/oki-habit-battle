import { callApi } from "@/utils/callApi";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./components/SearchBar";

const Index = async () => {
  const categories = await callApi("/battle-categories", {
    method: "GET",
  })

  return (
    <div className="pt-3">
      <SearchBar />
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