'use client'

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {CartContextType, CartItem} from "@/types/cart";
import {Product} from "@/types/product";

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
    children : ReactNode
}

export function CartProvider({ children } : CartProviderProps){
    const [cart, setCart ] = useState<CartItem[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    //1 불러오기 최초 한번
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if(savedCart){
            try{
                setCart(JSON.parse(savedCart))
            }catch (error){
                console.log(`장바구니 로드 실패`, error)
            }
        }
        setIsInitialized(true) //초기화 완료
    }, [])

    //cart가 변경될 때마다 localStorage에 저장
    useEffect(() => {
        if(isInitialized){
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }, [cart]);

    //장바구니에 추가
    const addToCart =(product : Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.product.id === product.id)

            if(existingItem){
                return prevCart.map(item =>
                item.product.id === product.id
                ? {...item, quantity: item.quantity +1}
                    : item
                )
            }else{
                //없으면 새로 추가
                return [...prevCart, {product, quantity :1 }]
            }
        })
    }
    
    //장바구니에서 제거
    const removeFromCart = (productId : number) => {
        setCart(prevCart => prevCart.filter(item => item.product.id !== productId))
    }
    
    const updateQuantity = (productId : number, quantity : number) => {
        if(quantity <= 0){
            removeFromCart(productId)
            return
        }

        setCart(prevCart =>
            prevCart.map(item => item.product.id === productId
            ? {...item, quantity}
            : item)
        )
    }

    // 장바구니비우기
    const clearCart = () => {
        setCart([])
    }

    //총 금액 계산
    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity)
    } , 0)
    }


    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0)
    }

    const value : CartContextType = {
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getTotalItems,
            getTotalPrice
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}


//useCart Hook
export function useCart(){
    const context = useContext(CartContext)
    if(!context){
        throw new Error('useCart는 CartProvider안에서만 사용해야 합니다.')
    }
    return context
}