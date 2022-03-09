import { doc, getDoc, getFirestore } from "firebase/firestore"
import app from "./firebaseConfig"
const db = getFirestore(app)

export const getUser = async (uid) => {
    const userDocRef = doc(db, 'users', `${uid}`)
    const docSnap = await getDoc(userDocRef)
    return docSnap.data()
}