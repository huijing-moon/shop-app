'use client'

import {Product} from "@/types/product";
import {useEffect, useState} from "react";
import {collection, getDocs} from "@firebase/firestore";
import {db} from "@/lib/firebase";
import {setLazyProp} from "next/dist/server/api-utils";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProducts() {

            try{
                setLoading(true)
                
                //firestore에서 products 컬렉션 가져오기
                const querySnapshot  = await getDocs(collection(db, 'products'))


                //문서들을 Product 배열로 변환
                const productsData: Product[] = []
                querySnapshot.forEach((doc) => { //각 문서를 순회하여 데이터 추출
                    productsData.push(doc.data() as Product)
                })
                
                // id 순으로 정렬
                productsData.sort((a,b) => a.id - b.id)

                setProducts(productsData)
                setError(null)
            } catch (err){
                setError(`상품을 불러올 수 없습니다.`)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])
    return {products,loading,error}
}