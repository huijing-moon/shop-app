'use client'


import {createContext, ReactNode, useEffect, useState} from "react";
import {AuthContextType} from "@/types/auth";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User} from "@firebase/auth";
import firebase from "firebase/compat";
import auth = firebase.auth;
import {async} from "@firebase/util";

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children : ReactNode
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser ] = useState<User | null>(null)
    const [loading, setLoaidng] = useState(true)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setUser(user)
            setLoaidng(false)
            console.log('Auth 상태: ', user ? user.email : '로그아웃')
        })
        return unsubscribe
    }, [])

    //회원가입
    const signUp = async (email: string, password : string) => {
        try{
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error: any){
            console.error('회원가입 에러: ', error)
            throw new Error(error.message)
        }
    }

    //로그인
    const signIn = async (email: string, password : string) => {
        try{
            await signInWithEmailAndPassword(auth, email,password)
        }catch (error: any){
            console.error('로그인 에러: ', error)
            throw new Error(error.message)
        }
    }


}