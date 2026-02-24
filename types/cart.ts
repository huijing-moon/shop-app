import {Product} from "@/types/product";

export interface CartItem{
    product : Product
    quantity : number //수량
}

export interface CartContextType{
    cart : CartItem[]
    addToCart : (product : Product) => void        //상품추가(반환값 없음)
    removeFromCart : (productId : number) => void  //상품삭제
    updateQuantity : (productId : number, quantity : number) => void  //수량변경
    clearCart : () => void  
    getTotalItems : () => number  //전체개수
    getTotalPrice : () => number  // 전체금액
}