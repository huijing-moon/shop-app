import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCx-ZC8ZWfd8X4ab9MseCGIke_MKaclDuE",
    authDomain: "my-shop-23624.firebaseapp.com",
    projectId: "my-shop-23624",
    storageBucket: "my-shop-23624.firebasestorage.app",
    messagingSenderId: "584212600636",
    appId: "1:584212600636:web:d36665f4e1531bfc4a3039"
};

// ⭐ Firebase 초기화 (중복 방지)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// ⭐ Firestore 인스턴스
export const db = getFirestore(app)

export default app