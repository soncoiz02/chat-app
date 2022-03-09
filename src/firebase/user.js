import { collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore"
import app from "./firebaseConfig"
const db = getFirestore(app)

export const getUser = async (uid) => {
    const userDocRef = doc(db, 'users', `${uid}`)
    const docSnap = await getDoc(userDocRef)
    return docSnap.data()
}

export const setIsOnline = async (uid, type) => {
    const userDocRef = doc(db, 'users', `${uid}`)
    await updateDoc(userDocRef, {
        isOnline: type
    })
}

export const getAllUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot
}