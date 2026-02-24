'use client'

import {useCart} from "@/contexts/CartContexts";
import Link from "next/link";

export default function CartPage(){
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

    //장바구니가 비어있을 때
    if(cart.length === 0){
        return (
            <main className="min-h-screen bg-gray-50">
                {/* 헤더 */}
                <header className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                ← 쇼핑 계속하기
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">
                                🛒 장바구니
                            </h1>
                        </div>
                    </div>
                </header>

                {/* 빈 장바구니 */}
                <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                    <div className="text-8xl mb-8">🛒</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        장바구니가 비어있습니다
                    </h2>
                    <p className="text-gray-600 mb-8">
                        쇼핑을 시작해보세요!
                    </p>
                    <Link
                        href="/"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        쇼핑 시작하기
                    </Link>
                </div>
            </main>

        )
    }
    //장바구니에 상품이 있을때
    return(
        <main className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                ← 쇼핑 계속하기
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">
                                🛒 장바구니
                            </h1>
                        </div>
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-700 text-sm"
                        >
                            전체 삭제
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* 왼쪽: 상품 목록 */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.product.id}
                                className="bg-white rounded-lg shadow-md p-6"
                            >
                                <div className="flex gap-6">
                                    {/* 상품 이미지 */}
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-5xl">{item.product.image}</span>
                                    </div>

                                    {/* 상품 정보 */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Link
                                                    href={`/product/${item.product.id}`}
                                                    className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                                                >
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-gray-400 hover:text-red-600"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {/* 가격 & 수량 */}
                                        <div className="flex justify-between items-center mt-4">
                                            <div className="flex items-center gap-3">
                                                {/* 수량 조절 */}
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                                >
                                                    −
                                                </button>
                                                <span className="w-12 text-center font-semibold">
                                                  {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* 가격 */}
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-blue-600">
                                                    ${(item.product.price * item.quantity).toLocaleString()}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="text-sm text-gray-500">
                                                        ${item.product.price.toLocaleString()} × {item.quantity}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 오른쪽: 주문 요약 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                주문 요약
                            </h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>상품 개수</span>
                                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}개</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>상품 금액</span>
                                    <span>${getTotalPrice().toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>배송비</span>
                                    <span className="text-green-600">무료</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">총 금액</span>
                                        <span className="text-2xl font-bold text-blue-600">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition mb-3">
                                주문하기
                            </button>
                            <Link
                                href="/"
                                className="block w-full text-center bg-gray-200 text-gray-800 py-4 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                쇼핑 계속하기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}