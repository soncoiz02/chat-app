import app from "./firebaseConfig";
import { child, get, getDatabase, onValue, orderByValue, query, ref, set } from 'firebase/database'
const db = getDatabase(app)

export const addRoomData = async (roomId, data) => {
    const roomRef = ref(db, 'rooms/' + roomId)
    await set(roomRef, data)
}

export const getRoomData = async (roomId) => {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, `rooms/${roomId}`))
    return snapshot.val()
}

export const getListMess = async (roomId) => {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, `rooms/${roomId}/messages`))
    return snapshot.val()
}

export const getAllRoomData = async () => {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, `rooms/`))
    return snapshot.val()
}

export const example = async () => {
    const dbRef = ref(db)
    const snapshot = await get(child(dbRef, `rooms/`))
    console.log(snapshot.val())
}

export const addMess = async (roomId, data) => {
    const dbRef = ref(db, `rooms/${roomId}/messages`)
    await set(dbRef, data)
}


export const deleteMess = async (roomId, index, uid) => {
    const dbRef = ref(db, `rooms/${roomId}/messages/${index}`)
    await set(dbRef, { sender: uid, content: "This message has been removed" })
}

export const setOfflineUser = async (roomId, data) => {
    const dbRef = ref(db, `rooms/${roomId}`)
    await set(dbRef, data)
}