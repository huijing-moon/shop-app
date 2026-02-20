// 상품 타입 정의
export interface Product {  //interface - 객체 구조 
    id: number
    name: string
    price: number
    image: string
    category: string
    description: string
}

// 카테고리 타입
export type Category = 'electronics' | 'clothing' | 'accessories' | 'all' //type - 유연함  unions