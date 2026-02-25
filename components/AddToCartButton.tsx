'use client'

import {Product} from "@/types/product";
import {useCart} from "@/contexts/CartContexts";
import {useState} from "react";

interface AddToCartButtonProps {
    product : Product
    className? : string
}

export function AddToCartButton({ product, className = ''} : AddToCartButtonProps){
    const { addToCart } = useCart()
    const [ showToast, setShowToast ] = useState(false)

    const handleAddToCart = () => {
        addToCart(product)

        //토스트 알림 표시
        setShowToast(true)

        //3초 후 자동으로 사라짐
        setTimeout(() => {
            setShowToast(false)
        }, 3000)
}

return (
    <>
        <button
            onClick={handleAddToCart}
            className={`w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition ${className}`}
        >
            🛒 담기
        </button>

        {/* ⭐ 토스트 알림 */}
        {showToast && (
            <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-50">
                <span className="text-2xl">✓</span>
                <div>
                    <p className="font-semibold">장바구니에 담았습니다!</p>
                    <p className="text-sm opacity-90">{product.name}</p>
                </div>
            </div>
        )}
    </>
)
}