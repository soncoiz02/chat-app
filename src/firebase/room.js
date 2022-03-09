import app from "./firebaseConfig";
import { child, get, getDatabase, ref, set } from 'firebase/database'
const db = getDatabase(app)

export const addRoomData = (roomId, data) => {
    const roomRef = ref(db, 'rooms/' + roomId)
    set(roomRef, data)
}

export const getOneRoomData = async (roomId) => {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, `rooms/${roomId}`))
    return snapshot.val()
}
