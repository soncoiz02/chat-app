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
    let data = {}
    onValue(ref(db, 'rooms/'), (snapshot) => {
        if (snapshot.exists()) {
            data = snapshot.val()
        }
    })
    return data
}

export const example = async (id) => {
    const data = query(ref(db, 'rooms'), orderByValue(id))
    console.log(data)
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