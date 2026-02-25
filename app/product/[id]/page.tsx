import {products} from "@/data/products";
import { notFound } from 'next/navigation'
import Link from "next/link";
import { AddToCartButton } from '@/components/AddToCartButton'
import {doc, getDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {Product} from "@/types/product";

interface ProductPageProps {
    params : Promise<{
        id : string  // URL의 [id] 부분
    }>
}


//async 를 붙이면 > 항상 promise를 반환
export default async function ProductPage({params} : ProductPageProps){

    //await으로 params 기다리기
    const { id } = await params

    //firestore에서 단일 문서 가져오기
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()){
        notFound()
    }

    const product = docSnap.data() as Product


    //상품이 없으면 404
    if(!product){
        notFound()
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link
                        href="/"
                        className="text-gray-600 hover:text-gray-900"
                    >
                        ← 뒤로
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">
                        🛍️ My Shop
                    </h1>
                </div>
            </header>

            {/* 상품 상세 */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* 왼쪽: 이미지 */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center h-96">
                            <span className="text-9xl">{product.image}</span>
                        </div>

                        {/* 오른쪽: 정보 */}
                        <div className="flex flex-col justify-between">
                            <div>
                                {/* 카테고리 배지 */}
                                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full mb-4">
                              {product.category === 'electronics' ? '전자제품' :
                                  product.category === 'clothing' ? '의류' : '액세서리'}
                                </span>

                                {/* 상품명 */}
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    {product.name}
                                </h1>

                                {/* 설명 */}
                                <p className="text-gray-600 text-lg mb-6">
                                    {product.description}
                                </p>

                                {/* 가격 */}
                                <div className="mb-8">
                                    <p className="text-sm text-gray-500 mb-1">가격</p>
                                    <p className="text-5xl font-bold text-blue-600">
                                        ${product.price.toLocaleString()}
                                    </p>
                                </div>

                                {/* 상세 정보 */}
                                <div className="border-t border-gray-200 pt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">상품 ID</span>
                                        <span className="font-semibold">#{product.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">재고</span>
                                        <span className="font-semibold text-green-600">재고 있음</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">배송</span>
                                        <span className="font-semibold">무료 배송</span>
                                    </div>
                                </div>
                            </div>

                            {/* 버튼들 */}
                            <div className="space-y-3 mt-8">
                                <div className="space-y-3 mt-8">
                                    <AddToCartButton product={product} />  {/* ⭐ 컴포넌트 사용 */}
                                    <button className="w-full bg-gray-200 text-gray-800 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 transition">
                                    ❤️ 찜하기
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 추가 정보 탭 */}
                    <div className="border-t border-gray-200">
                        <div className="max-w-6xl mx-auto px-8 py-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                상품 상세 정보
                            </h2>
                            <div className="prose max-w-none text-gray-600">
                                <p>
                                    {product.name}은(는) 최고의 품질과 성능을 자랑하는 제품입니다.
                                    고객님의 만족을 위해 엄선된 상품만을 제공합니다.
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li>✓ 정품 보장</li>
                                    <li>✓ 1년 무상 A/S</li>
                                    <li>✓ 빠른 배송 (1-2일 이내)</li>
                                    <li>✓ 14일 이내 무료 반품</li>
                                </ul>
                            </div>

                            {/* 리뷰 섹션 (가짜 데이터) */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    고객 리뷰
                                </h3>
                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                                            <span className="font-semibold">김철수</span>
                                        </div>
                                        <p className="text-gray-600">
                                            정말 만족스러운 제품입니다. 배송도 빠르고 품질도 좋네요!
                                        </p>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="text-yellow-500">⭐⭐⭐⭐</div>
                                            <span className="font-semibold">이영희</span>
                                        </div>
                                        <p className="text-gray-600">
                                            가격 대비 훌륭한 제품입니다. 추천해요!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}