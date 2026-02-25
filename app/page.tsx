'use client'
import { products } from '@/data/products'
import {useState} from "react";
import {Category} from "@/types/product";
import Link from "next/link";
import {useCart} from "@/contexts/CartContexts";
import { AddToCartButton } from "@/components/AddToCartButton";

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<Category>('all') //<> 타입 지정
    const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'name'>('name')
    const { addToCart, getTotalItems } = useCart()

    const filteredProducts = products
        //카테고리 필터
        .filter(product => {
            if (selectedCategory == 'all') return true
            return product.category === selectedCategory
        })
         //검색어 필터
        .filter(product => {
            if(!searchQuery) return true
            return product.name.toLowerCase().includes(searchQuery.toLowerCase())
        })
      //정렬
        .sort((a,b)=> {
            if(sortBy == 'price-low') return a.price - b.price
            if(sortBy == 'price-high') return b.price - a.price
            return a.name.localeCompare(b.name)
        })




  return (
      <main className="min-h-screen bg-gray-50">
        {/* 헤더 */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🛍️ My Shop
            </h1>
            <div className="flex items-center gap-4">
                <Link href={`/cart`}>
              <button className="text-gray-600 hover:text-gray-900">
                🛒 <span className="ml-1">{getTotalItems()}</span>
              </button>
                </Link>
            </div>

          {/*검색창 추가*/}
          <div className= "relative">
              <input
                  type= "text"
                  placeholder= "상품 검색 ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          </div>
        </header>
        {/* 메인 컨텐츠 */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* ⭐ 필터 & 정렬 */}
            <div className="mb-6 flex flex-wrap gap-4 items-center">
                {/* 카테고리 필터 */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        전체
                    </button>
                    <button
                        onClick={() => setSelectedCategory('electronics')}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === 'electronics'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        전자제품
                    </button>
                    <button
                        onClick={() => setSelectedCategory('clothing')}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === 'clothing'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        의류
                    </button>
                    <button
                        onClick={() => setSelectedCategory('accessories')}
                        className={`px-4 py-2 rounded-lg transition ${
                            selectedCategory === 'accessories'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        액세서리
                    </button>
                </div>

                {/* 정렬 */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="name">이름순</option>
                    <option value="price-low">가격 낮은순</option>
                    <option value="price-high">가격 높은순</option>
                </select>
            </div>


            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                    전체 상품
                    <span className="text-lg text-gray-500 ml-2">
              ({filteredProducts.length}개)
                      </span>
                </h2>
            </div>
            {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-6xl mb-4">🔍</p>
                    <p className="text-xl text-gray-600">상품을 찾을 수 없습니다</p>
                    <p className="text-gray-500 mt-2">다른 검색어를 시도해보세요</p>
                </div>
            ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (  //key!!
                <Link
                    key = {product.id}
                    href={`/product/${product.id}`} >
                <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* 상품 이미지 (이모지) */}
                  <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <span className="text-7xl">{product.image}</span>
                  </div>

                  {/* 상품 정보 */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                        <div onClick={(e) => e.preventDefault()}>
                            <AddToCartButton
                                product={product}
                                className="!w-auto !py-2 !text-base"
                            />
                        </div>

                    </div>
                  </div>
                </div>
                </Link>
            ))}

          </div>
                )}
        </div>

      </main>

  )
}